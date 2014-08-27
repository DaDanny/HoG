'use strict';

angular.module('hoGApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, Personservice, $location) {
    $scope.errors = {};
    var fbID = 1470155896577390;
    window.fbAsyncInit = function() {
      FB.init({
        appId      : fbID,
        xfbml      : true,
        version    : 'v2.0'
      });
      var urlString = "https://graph.facebook.com/oauth/access_token?client_id=1470155896577390&client_secret=b122334a3c75a4542acfef6a631afca5&grant_type=client_credentials";
      var accessCode = '';
      $.get(
          urlString,
          {paramOne : 1, paramX : 'abc'},
          function(data) {
             console.log(data);
             accessCode = data;
             accessCode = accessCode.slice(13);
             console.log(accessCode);
             FB.api('/715770595164882/photos', {
                access_token : accessCode
              },function(response){
                console.log('response:', response["data"]);
                  whatsOnFB(response["data"]);
                  console.log(response);
                });
              }
      );

      // FB.login(function(){
      //    FB.api(
      //     "/475351895119",
      //     function (response) {
      //       if (response && !response.error) {
      //         console.log('success!');
      //         whatsOnFB();
      //       }
      //       else{
      //         console.log('error', response);
      //       }
      //     }
      // );
      //   }, {scope: 'publish_actions,user_photos'}); 
    };

    var whatsOnFB = function(photoAlbum){
      //Flag for when we add new pic
      var addedNew = false;
      for(var photo in photoAlbum){
          var found = false;
          for(var folk in $scope.slides){
            if($scope.slides[folk].picURL == photoAlbum[photo].source){
              found = true;
            }
          }
        if(!found){
          console.log('youyoafdgf', photoAlbum[photo]);
          addFolk(photoAlbum[photo]);
          addedNew = true;
        }
      }
      whatsOnLocal(photoAlbum);
      if(addedNew){
        folkPromise();
      }
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

var whatsOnLocal = function(photos){
  var deleted = false;
  console.log('photos on local: ' ,photos);
  //Slides are folks on DB
  for(var slide in $scope.slides){
    var found = false;
    //Photos are photos on FB 
    for(var photo in photos){
      if($scope.slides[slide].picURL == photos[photo].source){
        found = true;
      }
    }
    if(!found){
      deleteFolk($scope.slides[slide]);
      deleted = true;
    }
  }
  if(deleted){
    folkPromise();
  }
}

/***********************
**** Add Folk to DB ****
***********************/
//Recieves JSON Object and parses that for DB info//
    var addFolk = function(folkObject){
      console.log('folkObject: ' , folkObject);
      var url = folkObject.source;
      var icon = '';
      var description = folkObject.name.replace(/\n/g,"  ");
      var things = description.split('  ');
      var name = things[0];
      var quote = things[1];
      var tags = things[2];
      console.log('tags: ', tags);
      var hashTagArray = tags.split(',');
      for(var tag in hashTagArray){
        hashTagArray[tag] = hashTagArray[tag].trim();
      }
      console.log('settings: ', hashTagArray);
      //Send to service to make POST request
      Personservice.newFolk(url,name,quote,hashTagArray,icon)
        .then(function(promise){
          console.log('done!');
          folkPromise();
        })
    }


    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};

    var folkPromise = function(){
      Personservice.getFolks()
        .then(function(data){
          $scope.slides = data;
          console.log($scope.slides);
        })
    }
    folkPromise();

    var deleteFolk = function(folk){
      Personservice.deleteFolk(folk._id)
        .success(function(data){
          $scope.slides = data;
          console.log('deleted!', folk.folkName);
        });
    }

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
  });
