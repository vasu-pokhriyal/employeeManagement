'use strict';
const mongoose = require('mongoose');


// codes Schema
let projectSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  projectLengthEstimate: {
    type: Number,
  },
  projectLengthActual:{
    type: Number,
   
  },
  numberOfBugs: {
    type: Number,
    default:0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

module.exports = mongoose.model('projects', projectSchema);
