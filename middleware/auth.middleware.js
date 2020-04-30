const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token =
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]) ||
    "";

  try {
    if (!token) {
      // temp
      req.isAuth = true;
      req.roles = "admin";
    } else {
      const { userId, privileges, userName, ...rest } = jwt.verify(
        token,
        "secret"
      );
      req.userId = userId;
      req.userName = userName;
      req.roles = privileges;
    }
    req.isAuth = true;
  } catch (e) {
    req.isAuth = false;
    req.roles = "";
  }
  req.passed = passed.bind(req);
  req.hasAny = hasAny.bind(req);

  console.warn("request", req.isAuth, req.userId, req.userName, req.roles);
  next();
};

function passed(roleNames) {
  if (!this.hasAny(roleNames)) {
    throw new Error("access-denied");
  }
}
function hasAny(roleNames = "") {
  return (
    this.isAuth &&
    (this.roles.includes("admin") || roleNames.split(",").some((x) => this.roles.includes(x)) )
  );
}
