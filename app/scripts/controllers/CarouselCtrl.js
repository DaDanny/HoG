function CarouselCtrl($scope) {
  $scope.myInterval = -1;
  var slides = $scope.slides = [];

  // image array pulled from MongoDB
  var imageArray = [];

	// replace this with FB integration
	// REMOVE THIS CODE ONCE INTEGRATION IS DONE
	// SHOULD BE PULLING FROM DB
	var obj_1 = {
		image: 'images/feature_person.jpg',
		text: '"Gastown is awesome"'
	};
	
	var obj_2 = {
		image: 'images/gastown0.jpg',
		text: '"Gastown 2 is awesome"'
	};
	
	imageArray.push(obj_1);
	imageArray.push(obj_2);
	
	

  $scope.addImagesToCarousel = function() {
	var imageArraySize = imageArray.length;
	
	for(var i=0; i < imageArraySize; i++)
	{
		slides.push(imageArray[i]);
	}
  };

	$scope.addImagesToCarousel();
}