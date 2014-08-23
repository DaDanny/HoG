'use strict';

angular.module('hoGApp')
  .service('Personservice', function($http,$q) {
    return{
      newFolk : function(picURL,folkName,quote,hashTags,icon){
        var method = 'POST';
        var insertURL = '/api/folk';
        var formData = {
          'picURL' : picURL,
          'folkName' : folkName,
          'quote' : quote,
          'hashTags' : hashTags,
          'icon' : icon
        };

        var jdata = JSON.stringify(formData);
        var promise = $http({
          method: method,
          url : insertURL,
          data : jdata,
          headers : {'Content-Type' : 'application/json'}
        }).then(function(response){
          picURL = response.data.picURL;
          folkName = response.data.folkName;
          quote = response.data.quote;
          hashTags = response.data.hashTags;
          icon = response.data.icon;

          return{
            picURL : function(){
              return picURL;
            },
            folkName : function(){
              return folkName;
            },
            quote : function(){
              return quote;
            },
            hashTags : function(){
              return hashTags;
            },
            icon : function(){
              return icon;
            }
          };
        });
        return promise;
      },
      getFolks : function(){
        return $http.get('/api/allFolks')
          .then(function(response){
            if(typeof response.data === 'object'){
              return response.data;
            }
            else{
              return $q.reject(response.data);
            }
          }, function(response){
            return $q.reject(response.data);
          });
      },
      tester : function(){
        console.log('test service function');
      }
    };
  });
