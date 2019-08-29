const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    module:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "AppModule"
    }
});

module.exports = mongoose.model('Role', schema);