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
    required: true,
  },

  description: {
    type: String,
    required: true,
    defalut: "Complete job description",
  },

  country: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  junior: [{
    type: Schema.Types.ObjectId,
    ref: "juniors",
  }],


  technologies: {
    type: Schema.Types.ObjectId,
    ref: "technologies",
  },

  premium: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["active", "paused", "closed"],
    default: "active",
  }

});


module.exports = model("jobs", jobsSchema);
