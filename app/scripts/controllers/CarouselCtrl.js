function CarouselCtrl($scope,$sce,Personservice) {
  $scope.myInterval = 15000;
  
  $scope.sanitizeUrl = function(url) {
		return $sce.trustAsResourceUrl(url);
  }
}