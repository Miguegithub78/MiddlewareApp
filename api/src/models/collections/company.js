const { Schema, model } = require('mongoose');

const companySchema = new Schema({

    name: {
        type: String,
        required: true
    },

    webpage: {
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

    country: {
        type: String,
        required: false
    },

    state: {
        type: String,
        required: false
    },
    
    city: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        maxLength: 500
    },
})

module.exports = model('company', companySchema)