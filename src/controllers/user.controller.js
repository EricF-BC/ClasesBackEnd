import { HttpResponse } from "../utils/http.response.js";
import UserServices from "../services/user.services.js";
import { sendMail } from "../services/email.services.js";
import { createResponse } from "../path.js";
import Controllers from "./class.controller.js";

const httpResponse = new HttpResponse();
const userService = new UserServices();

export default class UserController extends Controllers{
  constructor(){
    super(userService);
  };

  loginPostMan = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userLogin = await this.service.login({ email, password });
      const user = await this.service.getUserById(userLogin.id);
      if (!user) res.status(401).json({ msg: "Error de autenticacion" });
      req.session.user = user;
      req.session.email = user.email;
      req.session.role = user.role;
      res.send("Login successful");
    } catch (error) {
      res.status(401).send("Invalid credentials");
    }
  };


  registerPostman = async (req, res) => {
    try {
      const newUser = await this.service.register(req.body);
      if (!newUser) res.status(401).json({ msg: "Error de Registro" });
      res.send("Registrado Satisfactoriamente");
    } catch (error) {
      res.status(401).send("ERROR con el registro");
    }
  };

  logout = async (req, res, next) => {
    try {
      req.session.destroy();
      res.status(200).json({ msg: "Haz Deslogeado" });
    } catch (error) {
      next(error)
    }
  }

  profileController = async (req, res, next) => {
    try {
      if (req.session) {
        const data = req.session.user;
        return httpResponse.Ok(res, data);
      } else return httpResponse.Unauthorized(res, data);
    } catch (error) {
      next(error);
    }
  };

  updatePremiumController = async (req, res, next) => {
    try {
      if (req.session) {
        const { uid } = req.params;
        const userUpdate = await this.service.updatePremium(uid);
        return httpResponse.Ok(res, userUpdate);
      } else return httpResponse.Unauthorized(res, userUpdate);
    } catch (error) {
      next(error);
    }
  
  }

  generateResetPass = async(req, res, next) => {
    try {
      const user = req.session.user;
      const token = await  this.service.generateResetPass(user);
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
      const updatePass = await this.service.updatePass(pass, user)
      if(!updatePass) return createResponse(res, 404, 'Cannot be the same');
      res.clearCookie('tokenpass');
      return createResponse(res, 200, updatePass);
    } catch (error) {
      next(error);
    }
  }

  getAllUsersDto = async(req, res, next) => {
    try {
      res.send(await this.service.getAll())
    } catch (error) {
      next(error);
    }
  }

  deleteInactiveUsers = async(req, res, next) => {
    try {
      const data = await this.service.deleteInactiveUsers();
      if(!data) return createResponse(res, 404, 'Problems deleting inactive users');
      return createResponse(res, 200, "usuarios eliminados");
    } catch (error) {
      next(error);
    }
  }

  protectedSession = async (req, res) => {
    if (req.session.email) {
      res.send(
        `Welcome ${req.session.email}, you are logged in as ${req.session.role}`
      );
    } else {
      res.status(401).send("Unauthorized");
    }
  };

}


/////// CONTROLLERS QUE QUEDAN MEDIOS DEPRECADOS
// // REGISTER DE VISTA
// export const registerController = (req, res, next) => {
//   try {
//     res.redirect("/views/login");
//   } catch (error) {
//     throw error;
//   }
// };

// /// LOGIN  DE VISTA
// export const loginController = async (req, res, next) => {
//   try {
//     let id = null;
//     if (req.session.passport && req.session.passport.user) {
//       id = req.session.passport.user;
//     }
//     const user = await services.getUserById(id);
//     if (!user) res.status(401).json({ msg: "Error de autenticacion" });
//     req.session.email = user.email;
//     req.session.role = user.role;
//     res.redirect("/views/products");
//   } catch (error) {
//     throw error;
//   }
// };

// // EL GUGUL RESPONSE
// export const googleResponse = async (req, res) => {
//   try {
//     const { first_name, last_name, email, role } = req.user;
//     req.session.email = email;
//     res.redirect("/views/login");
//   } catch (error) {
//     throw error;
//   }
// };