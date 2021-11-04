const { Schema, model } = require('mongoose');

const publicationSchema = new Schema({

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
      required: true
  },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String, 
        required: true  
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
    }
})

module.exports = model('publication', publicationSchema)