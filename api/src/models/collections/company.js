const { Schema, model } = require('mongoose');

const companySchema = new Schema({

    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: true
    },

    gmail: {
        type: String,
        required: true
    },

    photograph: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },

    country: {
        type: String,
        required: false
    },

    city: {
        type: String,
        required: false
    },
})

module.exports = model('company', companySchema)