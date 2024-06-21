import * as services from '../services/user.services.js';

export const registerController = (req, res, next) => {

  try {
    res.redirect("/views/login");
  } catch (error) {
    next(error);
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
    next(error);
  }
}

export const githubResponse = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
}

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/views/login");
};
