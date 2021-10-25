const { Schema, model } = require('mongoose');

const juniorSchema = new Schema({

    name: String,

    apellido: String,

    gmail: String,

    github: String,

    foto: String,

    sexo: String

})

module.exports = model('juniors', juniorSchema)