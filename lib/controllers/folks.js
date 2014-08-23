'use strict';

var mongoose = require('mongoose');
var Folk = mongoose.model('Folk');

exports.newFolk = function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");

  Folk.create({
    picURL : req.body.picURL,
    folkName : req.body.folkName,
    quote : req.body.quote,
    hashTags : req.body.hashTags,
    icon : req.body.icon
  }, function(err, folk){
    if(err){
      res.send(err);
    }
    else{
      Folk.find(function(err, folks){
        if(err){
          res.send(err);
        }
        else{
          res.json(folks);
        }
      });
    }
  });
};

exports.allFolks = function(req,res){
  Folk.find().exec(function(err,folks){
    if(err){
      res.send(err);
    }
    else{
      res.json(folks);
    }
  });
};