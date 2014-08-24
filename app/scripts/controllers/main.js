'use strict';

angular.module('hoGApp')
  .controller('MainCtrl', function ($scope, $http, Personservice) {

/******************************
    Initialize Facebook SDK
*******************************/
    //App ID
    var fbID = 1439629336272699;

    window.fbAsyncInit = function() {
      FB.init({
        appId      : fbID,
        xfbml      : true,
        version    : 'v2.0'
      });

      FB.login(function(){
         FB.api(
          "/475351895119",
          function (response) {
            if (response && !response.error) {
              console.log('success!');
              getAlbum();
            }
            else{
              console.log('error', response);
            }
          }
      );
        }, {scope: 'publish_actions,user_photos'}); 
    };

    var getAlbum = function(){
      console.log('getting Album');
            FB.api(
                "/10152643970325120/photos",
                function (photos) {
                  console.log('size:', photos["data"].length);
                  var found = false;
                  for(var f in $scope.slides){
                    if($scope.slides[f].picURL === photos["data"][photos["data"].length-1].source){
                      console.log('dup!');
                      found = true;
                    }
                  }
                  if(!found){
                    console.log('new entry, so add!');
                    addFolk(photos["data"][photos["data"].length-1]);
                  }
                  //addFolk(photos["data"][photos["data"].length-1]);


                }
            );
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

/***********************
**** Add Folk to DB ****
***********************/
    var addFolk = function(folkObject){
      console.log(folkObject);
      var url = folkObject.source;
      var icon = folkObject.images[1].source;
      var description = folkObject.name.replace(/\n/g,"  ");
      var things = description.split('  ');
      var name = things[0];
      var quote = things[1];
      var tags = things[2];

      console.log('name:', name);
      console.log('quote:', quote);
      console.log('tags:', tags);
      Personservice.newFolk(url,name,quote,tags,icon);
    }

/************************
**** Get Folks from DB **
************************/
  var folkPromise = function(){
      Personservice.getFolks()
        .then(function(data){
          $scope.slides = data;
          console.log($scope.slides);
        })
  }
  folkPromise();

  });
