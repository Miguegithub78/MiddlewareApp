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
    },
    photograph: {
        type: String,
        required: false
    },

    publications: [{
        type: Schema.Types.ObjectId,
        ref: 'publication'
    }]

})

module.exports = model('admins', adminSchema)