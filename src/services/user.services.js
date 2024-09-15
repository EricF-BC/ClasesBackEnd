import { createHash, isValidPassword } from "../path.js";
import factory from '../persistence/daos/factory.js';
import config from "../config.js";
import { sendMail } from "./email.services.js";
import jwt from "jsonwebtoken";

const { userDao, cartDao } = factory;

export const generateToken = async(user, time = "5m") => {
  const payload = {
    userId: user._id,
  };
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: time });
}


export const getUserById = async (id) => {
  try {
    return await userDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    await userDao.updateLastConnection(userExist._id);
    return userExist;
  } catch (err) {
    throw new Error(err);
  }
};

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await userDao.getByEmail(email);
    if (!existUser) {
      const cartUser = await cartDao.createCart();
      if (email === config.USER_ADMIN && password === config.PASSWORD_ADMIN) {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          role: "admin",
          cart: cartUser._id,
        });
        return newUser;
      } else {
        const newUser = await userDao.register({
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

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};


export const updatePremium = async(id) => {
  try {
    const userExist = await userDao.getById(id);
    if (!userExist) return null;
    let newUser;
    if (userExist.role === 'user'){
      userExist.role = 'premium';
    }else if (userExist.role === 'premium'){
      userExist.role = 'user';
    }
    return await userDao.update(id, userExist);
  } catch (error) {
    throw new Error(error);
  }
}


export const generateResetPass = async(user) => {
  try {
    return generateToken(user, '1h');
  } catch (error) {
    throw new Error(error);
  }
}


export const updatePass = async(pass, user) => {
  try {
    const isEqual = isValidPassword(pass, user);
    if(isEqual) return null;
    const newPass = createHash(pass);
    return await userDao.update(user._id, { password: newPass });
  } catch (error) {
    throw new Error(error);
    
  }
}

