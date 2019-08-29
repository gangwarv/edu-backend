const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sortOrder: String,
    disabled: Boolean
});

module.exports = mongoose.model('AppModule', schema);