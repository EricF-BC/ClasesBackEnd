import { createHash, isValidPassword } from "../path.js";
import factory from '../persistence/daos/factory.js';
import config from "../config.js";
import { sendMail } from "./email.services.js";
import jwt from "jsonwebtoken";
import UserRepository from '../persistence/repository/user.repository.js';
import Services from './class.services.js';

const userRepository = new UserRepository();
const { userDao, cartDao } = factory;

export default class UserServices extends Services {
  constructor(){
      super(userDao);
  }

  getAll = async() => {
    try {
      return await userRepository.getUsers();
    } catch (error) {
      throw new Error(error);
    }
  }
  
  getUserById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.getUserByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      await this.dao.updateLastConnection(userExist._id);
      return userExist;
    } catch (err) {
      throw new Error(err);
    }
  };

  register = async (user) => {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await cartDao.createCart();
        if (email === config.USER_ADMIN && password === config.PASSWORD_ADMIN) {
          const newUser = await this.dao.register({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          return newUser;
        } else {
          const newUser = await this.dao.register({
            ...user,
            password: createHash(password),
            cartId: cartUser._id,
          });
          await sendMail(user, 'register')
          return newUser;
        }
      } else return null;
    } catch (error) {
      throw new Error(error);
    }
  };

  updatePremium = async(id) => {
    try {
      const userExist = await this.dao.getById(id);
      if (!userExist) return null;
      if (userExist.role === 'user'){
        userExist.role = 'premium';
      }else if (userExist.role === 'premium'){
        userExist.role = 'user';
      }
      return await this.dao.update(id, userExist);
    } catch (error) {
      throw new Error(error);
    }
  }

  generateToken = async(user, time = "5m") => {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, config.SECRET_KEY, { expiresIn: time });
  }

  generateResetPass = async(user) => {
    try {
      return this.generateToken(user, '1h');
    } catch (error) {
      throw new Error(error);
    }
  }

  updatePass = async(pass, user) => {
    try {
      const isEqual = isValidPassword(pass, user);
      if(isEqual) return null;
      const newPass = createHash(pass);
      return await this.dao.update(user._id, { password: newPass });
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteInactiveUsers = async() => {
    try {
      return await this.dao.deleteInactiveUsers()
    } catch (error) {
      throw new Error(error);
    }
  }
}


// export const visit = (req, res) => {
//   req.session.info && req.session.info.contador++;
//   res.json({
//     msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
//   });
// };