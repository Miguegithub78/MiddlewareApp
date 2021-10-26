const { Schema, model } = require('mongoose');

const publicationSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    photograph: {
        type: String,
        required: false
    },

    company: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        autopopulate: true

    },

    junior: {
        type: Schema.Types.ObjectId,
        ref: 'juniors',
        autopopulate: true
    },

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admins',
        autopopulate: true
    }
})

publicationSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('publication', publicationSchema)