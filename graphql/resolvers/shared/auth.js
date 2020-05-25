const jwt = require("jsonwebtoken");
const User = require("../../../models/app-management/user");
const Role = require("../../../models/app-management/role");
// const AppModule = require("../../models/app-management/appmodule");
const menusData = require('./menus.json')
const { TOKEN_EXPIRY } = require("../../../keys");
// const maxLoginAttempts = 50;

function transformUser(userDoc) {
  return {
    ...userDoc._doc,
    id: userDoc.id,
    role: userDoc.role.id,
    roleName: userDoc.role.name,
    privileges: userDoc.role.privileges,
  };
}

const login = async (_, { userName, password }, req) => {
  const userId = req.userId;
  const user = await User.findOne({
    $and: [
      {
        $or: [{ userName }, { _id: userId }],
      },
      {
        isActive: true,
      },
    ],
  }).populate("role");

  if (!user) throw new Error("User does not exists!");
  if (user.blocked) throw new Error("Your account has been blocked!");
  if (!req.isAuth && password !== user.password) {
    throw new Error("Invalid credentials!");
  }
  const data = {
    userId: user.id,
    userName: user.userName,
    roleName: user.role.name,
    privileges: user.role.privileges,
  };
  const token = jwt.sign(data, "secret", { expiresIn: TOKEN_EXPIRY });
  const menus = menusData.filter(
    (menu) =>
      !menu.privilege ||
      data.privileges.includes(menu.privilege) ||
      data.privileges.includes("admin")
  );
  return {
    menus,
    data: {
      ...data,
      token,
      expiresIn: new Date(
        new Date().getTime() + (TOKEN_EXPIRY - 1) * 1000
      ).getTime(),
    },
  };
};

const addUser = async (_, { user }, req) => {
  req.passed("user-create");
  // ommit pwd if empty
  if (!user.password) {
    delete user.password;
  }
  const count = await User.countDocuments({
    userName: user.userName,
    _id: { $ne: user.id },
  });
  if (count > 0) {
    throw new Error("UserName already exists!");
  }
  let createdUser = null;
  if (user.id)
    createdUser = await User.findByIdAndUpdate(user.id, user, { new: true });
  else createdUser = await User.create(user);

  createdUser.role = await Role.findById(user.role);

  return transformUser(createdUser);
};

const addRole = async (_, { id, name, privileges, isActive }, req) => {
  req.passed("role-create");
  privileges = privileges.split(",").sort().toString();

  let existingDoc = null;
  if (id)
    existingDoc = await Role.findByIdAndUpdate(
      id,
      { name, privileges, isActive },
      { new: true }
    );
  else
    existingDoc = await Role.create({
      name,
      privileges,
      isActive: true,
    });
  return existingDoc;
};

const users = () => {
  return User.find()
    .populate("role")
    .then((users) => users.map((u) => transformUser(u)));
};
const user = (_, { id }) => {
  return User.findById(id)
    .populate("role")
    .map((u) => transformUser(u));
};
const roles = () => {
  return Role.find();
};
const role = (_, { id }) => {
  return Role.findById(id);
};
const deleteRole = async (_, { id }, req) => {
  req.passed("role-delete");

  const roleCount = await Role.countDocuments({ _id: id });

  if (roleCount === 0) {
    throw new Error("Role does not exists!");
  }
  const count = await User.countDocuments({ role: id });

  if (count === 0) {
    return Role.findByIdAndDelete(id);
  }
  throw new Error("Kindly detach all its associated entities first.");
};

// const appmodules = () => {
//   return AppModule.find({ isActive: true });
// };
module.exports = {
  Query: {
    roles,
    role,
    users,
    user,
  },
  Mutation: {
    login,
    addUser,
    addRole,
    deleteRole,
  },
};
