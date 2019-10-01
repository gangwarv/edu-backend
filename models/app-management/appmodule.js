const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sortOrder: String,
    privileges: String,
    isActive: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('AppModule', schema);