const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sortOrder: String,
    privileges: [{
        type: String,
        required: true
    }],
    isActive: Boolean
});

module.exports = mongoose.model('AppModule', schema);