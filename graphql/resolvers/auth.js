const jwt = require('jsonwebtoken')
const User = require('../../models/app-management/user')
const Role = require('../../models/app-management/role')
const AppModule = require('../../models/app-management/appmodule')
// const Student = require('../../models/app-management/menu')
const maxLoginAttempts = 5;
const menusData = [
    {
        "sortOrder": 0,
        "module": "User Management",
        "text": "Profile",
        "path": "/profile",
        "position": "top"
    },
    {
        "sortOrder": 20,
        "module": "Attendance",
        "text": "Submit Attendance",
        "path": "/attendance/take",
        "position": "left"
    },
    {
        "sortOrder": 30,
        "module": "Attendance",
        "text": "View Attendance",
        "path": "/attendance/view",
        "position": "left"
    }
];

const login = ({ userName, password }) => {
    return User.findOne({ userName }).populate('role').exec().then(user => {
        if (!user)
            throw new Error('User does not exists!')
        if (user.blocked)
            throw new Error('Your account has been blocked!')
        if (password !== user.password) {
            user.retryAttempts = (user.retryAttempts || 0) + 1;
            user.blocked = user.retryAttempts >= maxLoginAttempts;

            return user.save().then(_ => {
                throw new Error(
                    user.retryAttempts > 2 ?
                        `Your account has been blocked.!`
                        : `Attempt ${user.retryAttempts} Incorrect username or password!`);
            });
        }
        user.retryAttempts = undefined;
        user.blocked = undefined;

        return user.save()
            .then(() => {
                const data = {
                    userId: user._id,
                    userName: user.userName,
                    role: user.role
                }
                const token = jwt.sign(data, 'secret', { expiresIn: 60 });
                return {
                    ...data,
                    token,
                    expiresIn: 60
                };
            });
    })
}

const addUser = async ({ userName, password, role }) => {
    const existingUser = await User.findOne({ userName }).exec();
    if (existingUser) {
        throw new Error('UserName already exists!')
    }
    const user = new User({
        userName,
        password,
        role
    });
    return user.save()
        .then((data) => {
            console.log('user saved', data);
            return data;
        })
        .catch((err) => {
            throw err
        })
}

const menus = (args, req) => {
    if (!req.isAuth) {
        throw new Error("Unauthorized!");
    }
    return menusData;
}

const addRole = async ({ id, name, privileges, isActive }) => {
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
    return User.find().populate('role').exec();
}
const roles = () => {
    return Role.find();
}
const deleteRole = async ({ id }) => {
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
    menus,
    roles,
    users,
    login,
    addUser,
    addRole,
    deleteRole
}

