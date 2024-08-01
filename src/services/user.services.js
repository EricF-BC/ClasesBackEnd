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
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
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

// export const logout = (req, res) => {
//   req.session.destroy();
//   res.redirect("/views/login");
// };



