'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Folk = mongoose.model('Folk');


// Folk.find({}).remove(function(){
//   console.log('start fresh!');
// });
