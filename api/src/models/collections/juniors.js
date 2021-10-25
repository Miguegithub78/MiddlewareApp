const { Schema, model } = require('mongoose');

const juniorSchema = new Schema({

    name:  {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    age: Number,

    username: String,

    gmail: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'languages',
        autopopulate: true,
        required: true
    }],

    technologies: [{
        type: Schema.Types.ObjectId,
        ref: 'technologies',
        autopopulate: true,
        required: true
    }]

})

module.exports = model('juniors', juniorSchema)