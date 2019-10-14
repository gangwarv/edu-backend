const jwt = require('jsonwebtoken')
const User = require('../../models/app-management/user')
const Role = require('../../models/app-management/role')
const AppModule = require('../../models/app-management/appmodule')
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
const menus = (args, req) => {
    if (!req.isAuth) {
        throw new Error("Unauthorized!");
    }
    return menusData;
}

function transformUser(userDoc){
    return {
        ...userDoc._doc,
        id: userDoc.id,
        role: userDoc.role.id,
        roleName: userDoc.role.name,
        privileges: userDoc.role.privileges
    }
}

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

const addUser = async ({ user }) => {
    // ommit pwd if empty
    if(!user.password){
        delete user.password;
    }
    const existingUser = await User.findOne({ userName: user.userName }).exec();
    if (existingUser) {
        console.log(existingUser.id, user.id)
        if (existingUser.id !== user.id) {
            throw new Error('UserName already exists!')
        }
        // update
        return Object.assign(existingUser, user).save();
    }
    if (user.id) {
        return User.findByIdAndUpdate(user.id, user, { new: true });
    }
    
    return User.create(user);
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
    return User.find().populate('role').then(users=>users.map(u=>transformUser(u)));
}
const user = ({ id }) => {
    return User.findById(id).populate('role').map(u=>transformUser(u));
}
const roles = () => {
    return Role.find();
}
const role = ({ id }) => {
    return Role.findById(id);
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
    role,
    users,
    user,
    login,
    addUser,
    addRole,
    deleteRole
}

