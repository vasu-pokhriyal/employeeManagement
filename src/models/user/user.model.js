'use strict';
const mongoose = require('mongoose');


// codes Schema
let userSchema = mongoose.Schema({
  firstName: {
    type: String,

  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
   
  },
  role:{
    type:String,
    enum:['ADMIN','EMPLOYEE']
  },
  dataOfBirth:{
    type: String,
   
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: '',
  },
  contactNo: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  address:{
    type:String
  },
  skillSets:[{
    type:String
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

module.exports = mongoose.model('users', userSchema);
