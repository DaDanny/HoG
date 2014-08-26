'use strict';

angular.module('hoGApp')
  .controller('MainCtrl', function ($scope, $http, Personservice, Auth) {
    $scope.hashTags = [];
/************************
**** Get Folks from DB **
************************/
  var folkPromise = function(){
      Personservice.getFolks($scope.tagFilters)
        .then(function(data){
          $scope.slides = data;
          $scope.filteredLength = data.length;
          console.log('data: ', data);
          console.log('filteredLength: ', $scope.filteredLength);
          $scope.hashTags = [];
          getTags();
        })
  }
  folkPromise();
/******************************
    Initialize Facebook SDK
*******************************/
    //App ID
    
    var dummyData = [{
      folkName: 'Danny Francken',
      picURL : 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/1604738_1583350615223588_2509651942323867440_n.jpg?oh=023ac7f88fc7c471de1aa2668b047b00&oe=545C2068&__gda__=1416783454_1dc46f89869fd433a7812f2ae6cae83f',
      quote : 'Long live Michigan!',
      hashTags : ['Male', 'Web', 'USA', 'Pizza']

    },
    {
      folkName : 'Stephen Cheung',
      picURL : 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/269748_10150699877735624_68439_n.jpg?oh=0095cb273441f1129c35fc8f31616663&oe=5464E2EA&__gda__=1417134882_45fcc4e60d93d17b523447c4ffbc5c13',
      quote : 'Eat, sleep, code',
      hashTags : ['Male', 'Freelance', 'Web', 'Water']
    },
    {
      folkName : 'Tori Zhao',
      picURL : 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xfa1/t1.0-9/421251_10200203184389254_2009356066_n.jpg',
      quote : 'I love Art!',
      hashTags : ['Female', 'Sushi', 'Art', 'Design']
    },
    {
      folkName : 'Vania Budiman',
      picURL : 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpa1/t1.0-9/1238732_10151651804354611_1729328720_n.jpg',
      quote : 'We should eat Timmys!',
      hashTags : ['Female', 'Design', 'MySQL', 'Food']
    }];

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
      //hashTagString = $scope.slides[folk].hashTags;
      console.log('returned as: ' , $scope.slides[folk].hashTags);
      hashTagArray = $scope.slides[folk].hashTags;
      // //Split up String by commas and push to tag Array
      // hashTagArray = hashTagString[0].split(',');
      // for(var tag in hashTagArray){
      //   hashTagArray[tag] = hashTagArray[tag].trim();
      // }
      // $scope.slides[folk].hashTags = hashTagArray;
      //console.log('hashTags for ', $scope.slides[folk].folkName, ": ", $scope.slides[folk].hashTags);



      //Loop for each Tag in Array
      //Getting the Frequency Count for each tag
      for(var tag in hashTagArray){
        found = false;
        var tagTrimmed = hashTagArray[tag].trim();
        if(tagCount[tagTrimmed] == null){
          tagCount[tagTrimmed] = 1;
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
  }

  $scope.tagFilters = [];
  $scope.updateFilter = function(newTag){
    var found = false;
    var index = 0;
    for(var tag in $scope.tagFilters){
      if($scope.tagFilters[tag] == newTag){
        found = true;
        index = tag;
      }
    }
    if(found){
      $scope.tagFilters.splice(index,1);
    }
    else{
      $scope.tagFilters.push(newTag);
    }
    folkPromise();
    console.log('filterTags:', $scope.tagFilters);
  }
});
