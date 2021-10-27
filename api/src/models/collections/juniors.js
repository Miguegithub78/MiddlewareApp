const { Schema, model } = require('mongoose');

const juniorSchema = new Schema({

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
        required: false,
    },

    github: {
        type: String,
        required: false
    },

    photograph: {
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

    age: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        maxLength: 500
    },
    
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'languages',
        autopopulate: true
    }],

    technologies: [{
        type: Schema.Types.ObjectId,
        ref: 'technologies',
        autopopulate: true
    }]
    
})

juniorSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('juniors', juniorSchema)