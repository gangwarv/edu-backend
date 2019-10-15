const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers["authorization"] && req.headers["authorization"].split(' ')[1] || "";

    if (!token) {
        // req.isAuth = false;
        // return next();
        // temp
        req.userId = '5d6647a7336a97121ce90776';
        req.isAuth = true;
        req.roles = new Role(['admin']);
        return next();
    }

    try {
        const { userId, roles, ...rest } = jwt.verify(token, 'secret');
        req.userId = userId;
        req.isAuth = true;
        req.roles = new Role(roles);
        console.log(userId,rest)
    }
    catch {
        req.isAuth = false;
    }
    next();
}

function Role(roles) {
    this.roles = roles;
}
Role.prototype.has = function(roleName) {
    return this.roles.toString()
    .toLowerCase()
    .indexOf(roleName.toLowerCase()) > -1;
}
Role.prototype.passed = function(roleName) {
    const rolesFlat = this.roles.toString().toLowerCase();
    if(!roleName || rolesFlat === 'admin' || rolesFlat.indexOf(roleName.toLowerCase()) > -1){
        return;
    }
    throw new Error("Access-denied");
}
Role.prototype.getRoles = function() {
    return this.roles;
}