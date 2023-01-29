'use strict';
const mongoose = require('mongoose');


// codes Schema
let taskSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  estimatedHours: {
    type: Number,
    required:true
  },
  actualHours:{
    type: Number,
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

module.exports = mongoose.model('tasks', taskSchema);
