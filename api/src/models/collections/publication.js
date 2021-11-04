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
    },

    likes: [{
        type: String,
    }],

    likesNumber: {
        type: Number,
        default: 0
    }
})

module.exports = model('publication', publicationSchema)