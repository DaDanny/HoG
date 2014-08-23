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
                "/475351895119/photos",
                function (photos) {
                 console.log('photos:', photos["data"][0].name);
                 addFolk(photos["data"][0]);

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
    }


  });
