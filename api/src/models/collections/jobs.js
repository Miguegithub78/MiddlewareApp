const { Schema, model } = require("mongoose");

const jobsSchema = new Schema({
  
  photograph: {
    type: String,
    required: false,
  },

  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    // autopopulate: true
  },

  title: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
    defalut: "Complete job description",
  },

  country: {
    type: String,
    required: false,
  },

  city: {
    type: String,
    required: false,
  },

  salary: {
    type: Number,
    required: false,
  },

  currency: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  juniors: [{
    type: String,
    ref: "juniors",
  }],

  admin: {
    type: Schema.Types.ObjectId,
    ref: "admins",
  },

  technologies: [{
    type: Schema.Types.ObjectId,
    ref: "technologies",
  }],

  premium: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["active", "paused", "closed"],
    default: "active" 
  }

});


module.exports = model("jobs", jobsSchema);
