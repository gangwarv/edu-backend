const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const user = {
    userId: 99,
    userName: 'vishal',
    password: '123'
};

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
                throw new Error("Unauthenticated Request");
            }
            return ["Home", "Profile"]
        },
        addMenus: () => {

        }
    }