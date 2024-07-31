export const isAuth = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.status(403).json({ msg: "No autorizado"});
}

export const isAuthSession = (req, res, next) => {
    if(req.session.user) return next();
    res.status(403).json({ msg: "No autorizado"});
}