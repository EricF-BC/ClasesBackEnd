import { createHash, isValidPassword } from "../path.js";
import factory from '../persistence/daos/factory.js';
import config from "../config.js";

const { userDao, cartDao } = factory;

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
    return userExist;
  } catch (err) {
    throw new Error(err);
  }
};

export const register = async (user) => {
  try {
 
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



