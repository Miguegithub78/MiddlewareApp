const { Schema, model } = require('mongoose');

const jobsSchema = new Schema({

    photograph: {
        type: String,
        required: false
    },
    
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company'
  },
  
    title: {
        type: String,
        required: true
    },

    description: {
      type: String,
      required: true,
      defalut: 'No description'
  },

    country: {
        type: String,
        required: true
    },
    city: {
        type: String, 
        required: true  
    },
    address: {
        type: String,
        required: false
    },
    salary: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true  
    },  

    date: {
        type: Date,
        default: Date.now
    },

    junior: {
        type: Schema.Types.ObjectId,
        ref: 'juniors'
    },

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },

    technologies: {
        type: Schema.Types.ObjectId,
        ref: 'technologies'
    },

    premium: {
        type: Boolean,
        default: false
    }

})

module.exports = model('jobs', jobsSchema)