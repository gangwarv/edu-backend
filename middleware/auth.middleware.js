const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token =
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]) ||
    "";

  try {
    if (!token) {
      // temporary for graphiql interface only
      req.isAuth = true;
      req.userName = 'no_user';
      req.roles = ["admin"];
    } else {
      const { userId, privileges, userName, ...rest } = jwt.verify(
        token,
        "secret"
      );
      req.userId = userId;
      req.userName = userName;
      // without role user not allowed to enter
      req.roles = privileges.split(',');
    }
    req.isAuth = true;
  } catch (e) {
    req.isAuth = false;
    req.roles = [];
  }
  req.passed = passed.bind(req);
  req.hasAny = hasAny.bind(req);

  console.warn("request", req.isAuth, req.userName, 'isAdmin:',req.roles.includes('admin'));
  next();
};

function passed(roleNames) {
  if (!this.hasAny(roleNames)) {
    throw new Error("access-denied. needed priv is "+ roleNames);
  }
}
function hasAny(roleNames = "") {
  console.log(this.roles)
  return (
    this.isAuth &&
    (this.roles.includes("admin") || roleNames.split(",").some((x) => this.roles.includes(x)) )
  );
}
