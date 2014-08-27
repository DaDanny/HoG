'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing'),
  Folk = mongoose.model('Folk');


User.create({
    provider: 'local',
    name: 'Gastown Admin',
    email: 'gastown@Gastown.com',
    password: 'CosmoCoders'
  }, function() {
      console.log('finished populating users');
});

// Folk.find({}).remove(function(){
//   console.log('start fresh!');
// });
