const { model } = require("mongoose");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const juniorSchema = new Schema({

  idFireBase: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true,
  },

  gmail: {
    type: String,
    required: false,
    unique: true,
  },

  github: {
    type: String,
    required: false,
  },

  photograph: {
    type: String,
    required: false,
  },

  website: {
    type: String,
    required: false,
  },

  title: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  linkedin: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
    default: "Completa tu descripción",
  },

  languages: [
    {
      type: Schema.Types.ObjectId,
      ref: "languages",
      autopopulate: false,

    },
  ],

  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "technologies",
      autopopulate: false,
    },
  ],

  publications: [
    {
      type: Schema.Types.ObjectId,
      ref: "publication",
    },
  ],

  softskills: [
    {
      type: Schema.Types.ObjectId,
      ref: "softskills",
      autopopulate: false,
    },
  ],

  jobsExperience: [
    {
      companyName: String,
      industry: String,
      workPosition: String,
      workingTime: String,
    },
  ],

  academicHistory: [
    {
      institute: String,
      title: String,
      date: Date,
      description: String,
    },
  ],

  openToRelocate: {
    type: Boolean,
    required: false,
    default: false,
  },

  openToRemote: {
    type: Boolean,
    required: false,
    default: false,
  },

  openToFullTime: {
    type: Boolean,
    required: false,
    default: false,
  },

  postulationsJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "jobs",
    }, 
  ]   
  
})

juniorSchema.plugin(require("mongoose-autopopulate"));

module.exports = model("juniors", juniorSchema);
