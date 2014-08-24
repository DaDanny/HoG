function CarouselCtrl($scope,Personservice) {
  $scope.myInterval = -1;

  var folkPromise = function(){
      Personservice.getFolks()
        .then(function(data){
          $scope.slides = data;
          console.log($scope.slids);
        })
  }
  folkPromise();

}