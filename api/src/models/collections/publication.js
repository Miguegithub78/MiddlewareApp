const { Schema, model } = require('mongoose');

const publicationSchema = new Schema({

    description: {
        type: String,
        required: true
    },

    photograph: {
        type: String,
        required: false
    },

    title: {
        type: String
    },

    country: {
        type: String
    },

    dollar: {
        type: Boolean
    },

    tech: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },

    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'

    },

    junior: {
        type: Schema.Types.ObjectId,
        ref: 'juniors'
    },

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    }
})

module.exports = model('publication', publicationSchema)