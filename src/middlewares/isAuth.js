export const isAuth = (req, res, next) => {
    console.log(req.session.pasport.user);
    if(req.isAuthenticated()) return next();
    res.status(403).json({ msg: "No autorizado"});
}