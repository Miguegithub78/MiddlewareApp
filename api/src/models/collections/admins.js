const { Schema, model } = require('mongoose');

const adminSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    gmail: {
        type: String,
        required: true
    },

    github: {
        type: String,
        required: true
    }

})

module.exports = model('admins', adminSchema)