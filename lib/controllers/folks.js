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


exports.filterFolks = function(req,res){
  var string = req.params.qs;
  var query = '';
  if(string != undefined){
    var tagSearch = string.split(',');
    var tagArray = [];
    for(var t in tagSearch){
      tagArray.push(tagSearch[t]);
    }
    console.log('tagArray: ', tagArray);
    query = Folk.find({hashTags:{$all:tagArray}});
  }
  else{
    query = Folk.find();
  }
  //console.log('query on server: ', query);
  query.exec(function(err, folks){
    if(err){
      res.send(err);
    }
    else{
      res.json(folks);
    }
  });
};


exports.deleteFolk = function(req,res){
  var folkid = req.params.folkid;
  Folk.remove({
    _id : folkid
  }, function(err, folk){
    if(err){
      res.send(err);
    }
    else{
      Folk.find(function(err,folks){
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