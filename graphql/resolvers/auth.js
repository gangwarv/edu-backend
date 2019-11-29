const jwt = require('jsonwebtoken')
const User = require('../../models/app-management/user')
const Role = require('../../models/app-management/role')
const AppModule = require('../../models/app-management/appmodule')
const maxLoginAttempts = 50;
const menusData = [
    {
        text: "Hello",
        path: "/hello",
        module: "Home",
        privilege: null,
        position: 'left'
    },
    {
        text: "Academic Departments",
        path: "/acdepts",
        module: "EDP",
        privilege: 'course-view',
        position: 'left'
    },
    {
        text: "Courses",
        path: "/courses",
        module: "Master",
        privilege: 'course-view',
        position: 'left'
    },
    {
        text: "Categories",
        path: "/categories",
        privilege: 'category-view',
        module: "Master",
        position: 'left'
    },
    {
        text: "Users",
        path: "/users",
        module: "EDP",
        privilege: 'user-view',
        position: 'left'
    },
    {
        text: "Role",
        path: "/roles",
        module: "EDP",
        privilege: 'role-view',
        position: 'left'
    },
    {
        text: "Profile",
        path: "/profile",
        module: "EDP",
        privilege: null,
        position: 'top'
    }
];

function transformUser(userDoc) {
    return {
        ...userDoc._doc,
        id: userDoc.id,
        role: userDoc.role.id,
        roleName: userDoc.role.name,
        privileges: userDoc.role.privileges
    }
}

const login = async ({ userName, password }, req) => {
    const expiresIn = 300; // in seconds
    const userId = req.userId;
    const user = await User.findOne({
        $and: [
            {
                $or: [{ userName }, { _id: userId }]
            },
            {
                isActive: true
            }]
    }).populate('role');

    if (!user)
        throw new Error('User does not exists!')
    if (user.blocked)
        throw new Error('Your account has been blocked!')
    if (!req.isAuth && password !== user.password) {
        throw new Error('Invalid credentials!')
    }
    const data = {
        userId: user.id,
        userName: user.userName,
        roleName: user.role.name,
        privileges: user.role.privileges,
    }
    const token = jwt.sign(data, 'secret', { expiresIn: expiresIn });
    const menus = menusData.filter(menu => !menu.privilege || data.privileges.includes(menu.privilege) || data.privileges.includes('admin'))
    return {
        ...data,
        token,
        menus,
        validFrom: new Date().getTime(),
        expiresIn: new Date(new Date().getTime() + (expiresIn - 1) * 1000).getTime()
    };
}


const addUser = async ({ user }, req) => {
    req.passed('user-create');
    // ommit pwd if empty
    if (!user.password) {
        delete user.password;
    }
    const count = await User.countDocuments({ userName: user.userName, _id: { $ne: user.id } });
    if (count > 0) {
        throw new Error('UserName already exists!');
    }
    let createdUser = null;
    if (user.id)
        createdUser = await User.findByIdAndUpdate(user.id, user, { new: true });
    else
        createdUser = await User.create(user);

    createdUser.role = await Role.findById(user.role);

    return transformUser(createdUser)
}

const addRole = async ({ id, name, privileges, isActive }, req) => {
    req.passed('role-create');
    privileges = privileges.split(',').sort().toString();

    let existingDoc = null;
    if (id)
        existingDoc = await Role.findByIdAndUpdate(id, { name, privileges, isActive }, { new: true });
    else
        existingDoc = await Role.create({
            name,
            privileges,
            isActive: true
        });
    return existingDoc;
}

const users = () => {
    return User.find().populate('role').then(users => users.map(u => transformUser(u)));
}
const user = ({ id }) => {
    return User.findById(id).populate('role').map(u => transformUser(u));
}
const roles = () => {
    return Role.find();
}
const role = ({ id }) => {
    return Role.findById(id);
}
const deleteRole = async ({ id }, req) => {
    req.passed('role-delete');

    const roleCount = await Role.countDocuments({ _id: id });

    if (roleCount === 0) {
        throw new Error("Role does not exists!")
    }
    const count = await User.countDocuments({ role: id });

    if (count === 0) {
        return Role.findByIdAndDelete(id);
    }
    throw new Error("Kindly detach all its associated entities first.")
}
const appmodules = () => {
    return AppModule.find({ isActive: true });
}
module.exports = {
    appmodules,
    roles,
    role,
    users,
    user,
    login,
    addUser,
    addRole,
    deleteRole
}

