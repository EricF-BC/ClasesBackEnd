import { HttpResponse } from "../utils/http.response.js";
import * as services from "../services/user.services.js";
import { sendMail } from "../services/email.services.js";
import { createResponse } from "../path.js";
import Controllers from "./class.controller.js";
const httpResponse = new HttpResponse();

export const registerController = (req, res, next) => {
  try {
    res.redirect("/views/login");
  } catch (error) {
    throw error;
  }
};

export const loginController = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user) {
      id = req.session.passport.user;
    }
    const user = await services.getUserById(id);
    if (!user) res.status(401).json({ msg: "Error de autenticacion" });
    req.session.email = user.email;
    req.session.role = user.role;
    res.redirect("/views/products");
  } catch (error) {
    throw error;
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/views/login");
};

export const googleResponse = async (req, res) => {
  try {
    const { first_name, last_name, email, role } = req.user;
    req.session.email = email;
    res.redirect("/views/login");
  } catch (error) {
    throw error;
  }
};

export const protectedSession = async (req, res) => {
  if (req.session.email) {
    res.send(
      `Welcome ${req.session.email}, you are logged in as ${req.session.role}`
    );
  } else {
    res.status(401).send("Unauthorized");
  }
};

// Ruta de login
export const loginPostMan = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await services.login({ email, password });
    const user = await services.getUserById(userLogin.id);
    if (!user) res.status(401).json({ msg: "Error de autenticacion" });
    req.session.user = user;
    req.session.email = user.email;
    req.session.role = user.role;
    res.send("Login successful");
  } catch (error) {
    res.status(401).send("Invalid credentials");
  }
};

export const registerPostman = async (req, res) => {
  try {
    const newUser = await services.register(req.body);
    if (!newUser) res.status(401).json({ msg: "Error de Registro" });
    res.send("Registrado Satisfactoriamente");
  } catch (error) {
    res.status(401).send("ERROR con el registro");
  }
};

export const profileController = async (req, res, next) => {
  try {
    if (req.session) {
      const user = req.session.user;
      return httpResponse.Ok(res, data);
    } else return httpResponse.Unauthorized(res, data);
  } catch (error) {
    next(error);
  }
};


export const updatePremiumController = async (req, res, next) => {
  try {
    if (req.session) {
      const { uid } = req.params;
      const userUpdate = await services.updatePremium(uid);
      return httpResponse.Ok(res, userUpdate);
    } else return httpResponse.Unauthorized(res, userUpdate);
  } catch (error) {
    next(error);
  }

}

export default class UserController extends Controllers{

  generateResetPass = async(req, res, next) => {
    try {
      const user = req.session.user;
      const token = await await services.generateResetPass(user);
      if(token){
        await sendMail(user, 'resetPass', token);
        res.cookie('tokenpass', token);
        createResponse(res, 200, 'Email reset pass send OK')
      } else createResponse(res, 404, 'error email reset pass send')
    } catch (error) {
      next(error)
    }
  }

  updatePass = async(req, res, next) => {
    try {
      const user = req.session.user;
      const { pass } = req.body;
      const { tokenpass} = req.cookies;
      if(!tokenpass) return createResponse(res, 401, 'Unauthorized');
      const updatePass = await services.updatePass(pass, user)
      if(!updatePass) return createResponse(res, 404, 'Cannot be the same');
      res.clearCookie('tokenpass');
      return createResponse(res, 200, updatePass);
    } catch (error) {
      next(error);
    }
  }

}