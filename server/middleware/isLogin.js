function isLogin(req, res, next) {
    if(req.headers.token) {
        return next();
    }    
    res.status(403).json({msg: "Please Login First"});
}

module.exports = isLogin;