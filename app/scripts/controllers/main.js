'use strict';

angular.module('hoGApp')
  .controller('MainCtrl', function ($scope, $http, Personservice) {
    $scope.hashTags = [];
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
      //Flag for when we add new pic
      var addedNew = false;

      console.log('getting Album');
            FB.api(
                "/10152643970325120/photos",
                function (photos) {
                  /*
                  FB api returns JSON array of photos
                  Loop through array, adding new photos
                  to DB. Compares picture URL's to avoid
                  duplicates'
                  */
                  for(var photo in photos["data"]){
                      var found = false;
                      for(var f in $scope.slides){
                        if($scope.slides[f].picURL === photos["data"][photo].source){
                          found = true;
                        }
                      }
                    if(!found){
                      addFolk(photos["data"][photo]);
                      addedNew = true;
                    }
                  }
                }
            );
      if(addedNew){
        folkPromise();
      }
      getTags();
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
//Recieves JSON Object and parses that for DB info//
    var addFolk = function(folkObject){
      console.log('folkObject:', folkObject);
      var url = folkObject.source;
      var icon = folkObject.images[1].source;
      var description = folkObject.name.replace(/\n/g,"  ");
      var things = description.split('  ');
      var name = things[0];
      var quote = things[1];
      var tags = things[2];

      //Send to service to make POST request

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


/************************
******* Get Tags ********
************************/
  var getTags = function(){
    var hashTagString = '';
    var hashTagArray = [];
    var tagCount = {};
    var found = false;
    var max = 0;

    //First loop is for each folk
    for(var folk in $scope.slides){
      hashTagString = $scope.slides[folk].hashTags;
      console.log('hashTags for ', $scope.slides[folk].folkName, ": ", hashTagString);

      //Split up String by commas and push to tag Array
      hashTagArray = hashTagString[0].split(',');

      //Loop for each Tag in Array
      //Getting the Frequency Count for each tag
      for(var tag in hashTagArray){
        found = false;
        var tagTrimmed = hashTagArray[tag].trim();
        console.log('tag: ', tagTrimmed);
        if(tagCount[tagTrimmed] == null){
          tagCount[tagTrimmed] = 0;
        }
        else{
          var count = tagCount[tagTrimmed];
          count++;
          tagCount[tagTrimmed] = count;
        }
        if($scope.hashTags.length > 0){
          for(var hash in $scope.hashTags){
            if($scope.hashTags[hash] == tagTrimmed){
              found = true;
            }
          }
          if(!found){
            $scope.hashTags.push(tagTrimmed);
          }
        }
        else{
          $scope.hashTags.push(tagTrimmed);
        }
        
      }
    }
    for(var count in tagCount){
      console.log('count: ', count);
    }
    console.log('hashTags!', $scope.hashTags);
  }

  $scope.testClick = function(index){
    console.log('here!', index);
  }
});
