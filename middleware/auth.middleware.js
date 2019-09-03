const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers["authorization"] && req.headers["authorization"].split(' ')[1] || "";
    if (!token) {
        // req.isAuth = false;
        // return next();

        // temp
        req.userId = '5d6647a7336a97121ce90776';
        req.isAuth = true;
    }
    try {
        const data = jwt.verify(token, 'secret');
        req.isAuth = true;
        req.userId = data.userId;

        return next();
    } 
    catch (error) {
        req.isAuth = false;
        return next();
    }
}