import UserDao from "../daos/mongodb/user.dao.js"
import {UserModel} from "../daos/mongodb/models/user.model.js"

const userDao = new UserDao(UserModel);


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login(email, password)
        if (!user) res.status(401).json({ msg: 'No estas autorizado' });
        else{
            req.session.email = email;
            req.session.password = password;
            res.redirect('/views/products');
        }
    } catch (err) {
        throw new Error(err)
    }
}

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            const user = await userDao.register({
                ...req.body,
                role: 'admin'
            });
            if(user) res.redirect('/views/login')
                else res.status(401).json({ msg: 'User exists' });
        }else{
            const user = await userDao.register(req.body);
            if(user) res.redirect('/views/login')
                else res.status(401).json({ msg: 'User exists' });
        }
    } catch (error) {
        throw new Error(error)
    }
}



export const visit = (req, res) => {
    req.session.info && req.session.info.contador++;
    res.json({ msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`}) 
}


export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies
    })
}


export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/views/login');
}