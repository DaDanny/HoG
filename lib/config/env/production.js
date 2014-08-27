'use strict';

module.exports = {
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://cosmo:gastown@ds063919.mongolab.com:63919/gastown'
  }
};