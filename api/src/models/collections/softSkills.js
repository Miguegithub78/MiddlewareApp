const { Schema, model } = require('mongoose');

const softskillsSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: false
    }
})

module.exports = model('softskills', softskillsSchema)