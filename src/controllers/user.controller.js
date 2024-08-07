import { HttpResponse } from "../utils/http.response.js";
import * as services from "../services/user.services.js";
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
    console.log(req.session.role);
    res.redirect("/views/products");
    // const { first_name, last_name, email, age, role} = user;
    // res.json({
    //   msg: 'Login Ok',
    //   user: {
    //     first_name,
    //     last_name,
    //     email,
    //     age,
    //     role
    //   }
    // });
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
