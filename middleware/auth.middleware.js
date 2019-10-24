const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers["authorization"] && req.headers["authorization"].split(' ')[1] || "";

    if (!token) {
        req.isAuth = false;
        return next();
    }

    try {
        const { userId, privileges, userName, ...rest } = jwt.verify(token, 'secret');
        req.userId = userId;
        req.userName = userName;
        req.isAuth = true;

        req.roles = privileges;
        req.passed = passed.bind(req);
        req.hasRole = hasRole.bind(req);
        // req.hasAny = hasAny.bind(req);
    }
    catch {
        req.isAuth = false;
    }
    console.warn('request', req.isAuth, req.userId, req.userName, req.roles);
    next();
}

function passed(roleName) {
    if (!this.hasRole(roleName)) {
        throw new Error('access-denied');
    }
}
function hasRole(roleName = '') {
    return this.isAuth
        &&
        (
            this.roles.includes('admin')
            ||
            this.roles.includes(roleName)
        );
}
// function hasAny(roleName = '') {
//     return this.isAuth
//         &&
//         (
//             this.roles.includes('admin')
//             ||
//             roleName.split(',').some(role => this.roles.includes(role))

//         );
// }