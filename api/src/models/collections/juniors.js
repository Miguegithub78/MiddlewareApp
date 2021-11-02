const { model } = require('mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const juniorSchema = new Schema({

    _id: {
        type: String,
        required: true 
    },

    idMongo: {
        type: ObjectIdSchema,
        default: new ObjectId()
    },

    name: {
        type: String,
        required: true
    },

    gmail: {
        type: String,
        required: false,
        unique: true
    },

    github: {
        type: String,
        required: false,
    },

    photograph: {
        type: String,
        required: false
    },

    website:{
        type: String,
        required: false
    },
    
    title: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },

    linkedin: {
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
    
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'languages',
        autopopulate: true
    }],

    technologies: [{
        type: Schema.Types.ObjectId,
        ref: 'technologies',
        autopopulate: true
    }],

    publications: [{
        type: Schema.Types.ObjectId,
        ref: 'publication'
    }],
    
    softskills: [{
        type: Schema.Types.ObjectId,
        ref: 'softskills',
        autopopulate: true
    }],

    jobsExperience: [
        {
        companyName: String,
		industry: String,
		workPosition: String,
		workingTime: String
    }
],

    openToRelocate: {
        type: Boolean,
        required: false
    },

    openToRemote: {
        type: Boolean,
        required: false
    },

    openToFullTime: {
        type: Boolean,
        required: false
    },
})

juniorSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('juniors', juniorSchema)