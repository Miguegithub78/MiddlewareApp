const { Schema, model } = require('mongoose');

const jobsSchema = new Schema({


    photograph: {
        type: String,
        required: false
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: false
    },

    dollar: {
        type: Boolean
    },

    salary: {
        type: Number
    },

    tech: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },

    premium: {
        type: Boolean,
        default: false
    },

    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'

    },

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    }
})

module.exports = model('jobs', jobsSchema)