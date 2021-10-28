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
        required: true,
        unique: true
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

    premium: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        required: false,
        maxLength: 500
    },

    publications: [{
        type: Schema.Types.ObjectId,
        ref: 'publication',
        // autopopulate: true
    }]
})

// companySchema.plugin(require('mongoose-autopopulate'));

module.exports = model('company', companySchema)