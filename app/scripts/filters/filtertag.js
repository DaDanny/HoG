'use strict';

angular.module('hoGApp')
  .filter('filterTag', function () {
    return function (folks, tags) {
      return folks.filter(function(folk) {
        if(tags.length != 0){
          if(folks.length == 0){
            alert('no folks!');
          }
          for (var i in tags) {
              console.log('tag: ',folk.hashTags[i]);
                if (folk.hashTags.indexOf(tags[i]) == -1) {
                    return false;
                }
            }
            return true;
        }
        else{
          return true;
        }
      });
    };
  });
