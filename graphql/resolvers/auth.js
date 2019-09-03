const jwt = require('jsonwebtoken')
const User = require('../../models/app-management/user')
const Student = require('../../models/app-management/menu')

module.exports =
    {
        login: ({ userName, password }) => {
            return User.findOne({ userName }).exec().then(user => {
                if (!user)
                    throw new Error('User does not exists!')
                if (user.blocked)
                    throw new Error('User is blocked!')
                if (password !== user.password) {
                    user.retryAttempts = (user.retryAttempts || 0) + 1;
                    user.blocked = user.retryAttempts > 2;

                    return user.save().then(_ => {
                        throw new Error(`Attempt ${user.retryAttempts} Incorrect username or password!`);
                    });
                }
                user.retryAttempts = undefined;
                user.blocked = undefined;

                return user.save()
                    .then(() => {
                        const data = {
                            userId: user._id,
                            userName: user.userName
                        }
                        const token = jwt.sign(data, 'secret', { expiresIn: 60 });
                        return {
                            ...data,
                            token,
                            expiresIn: 60
                        };
                    });
            })
        },
        create: function ({ userName, password }) {
            const user = new User({
                userName,
                password
            });
            return user.save()
                .then((data) => {
                    console.log('user saved', data);
                    return data;
                })
                .catch((err) => {
                    throw err
                })
        },
        menus: (args, req) => {
            if (!req.isAuth) {
                throw new Error("Unauthorized!");
            }
            return menus;
        },
        get: ()=>{
            const student = new Student({
                firstName: "Vis",
                addresses: [
                    { city: "5d6647a7336a97121ce90776", state: "5d6647a7336a97121ce90777", address1: "H-12" }
                ]
            });
            return student.save()
            .then(s=>s.firstName)
        }
    }

const menus = [
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