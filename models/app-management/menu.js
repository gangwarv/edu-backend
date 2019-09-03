const mongoose = require('mongoose');

// const schema = new mongoose.Schema({
//     text: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: mongoose.Types.ObjectId,
//         required: true,
//         ref: "Role"
//     },
//     path: {
//         type: String,
//         required: true
//     },
//     position: {
//         type: String,
//         required: true,
//         default: 'left'
//     },
//     sortOrder: String,
//     disabled: Boolean
// });

// module.exports = mongoose.model('Menu', schema);

const schema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
        default: new Date().getFullYear()+'-'+(new Date().getFullYear()-1999)
    },
    firstName: {
        type: String,
        required: true
    },
    addresses: [
        {
            city: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            state: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            pin: String,
            address1: {
                type: String,
                require: true
            },
            address2: String,
            landmark: String
        }
    ],
    
},{timestamps: true}
);

module.exports = mongoose.model('StudentNames', schema);