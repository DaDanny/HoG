function CarouselCtrl($scope,$sce,Personservice) {
  $scope.myInterval = -1;
  
  $scope.sanitizeUrl = function(url) {
		return $sce.trustAsResourceUrl(url);
  }
}