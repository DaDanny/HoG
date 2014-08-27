'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolkSchema = new Schema({
  picURL : String,
  folkName : String,
  quote : String,
  hashTags : [],
  icon : String
});

mongoose.model('Folk', FolkSchema);