import * as services from '../services/user.services.js';

export const registerController = (req, res, next) => {

  try {
    res.redirect("/views/login");
  } catch (error) {
    throw(error);
  }
}


export const loginController = async (req, res, next) => {

  try {
    let id = null;
    if(req.session.passport && req.session.passport.user){ 
      id = req.session.passport.user;
    }
    const user = await services.getUserById(id);
    if(!user) res.status(401).json({ msg: "Error de autenticacion"});
    req.session.email = user.email;
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
    throw(error);
  }
}

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/views/login");
};


export const googleResponse = async(req, res) => {
  try {
    const { first_name, last_name, email, role} = req.user;
    req.session.email = email;
    res.redirect("/views/login");

  } catch (error) {
    throw(error);
  }
}