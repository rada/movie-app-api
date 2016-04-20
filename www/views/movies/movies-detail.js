app.controller('MoviesDetailCtrl', function($scope, MoviesService, $stateParams, $ionicLoading, GenreService, APP_CONFIG, CountryService){
  $scope.data = MoviesService.data;
  $scope.data.countryLabelId = "countryLabel";

  if($stateParams.id){
    var movieId = +$stateParams.id;
    MoviesService.dataSource.getMovieById(movieId).then(function(response){
      // console.log("MoviesDetailCtrl selectedMovie: ", $scope.data.selectedMovie);
      CountryService.drawMovieCountryMap('regions_div', $scope.data.selectedMovie, $scope.data.countryLabelId);
      $scope.chartData = MoviesService.getChartData($scope.data.selectedMovie);
    });
    // MoviesService.getCredits(movieId);
    MoviesService.dataSource.getCredits(movieId);
  }

  $scope.toggleWatched = function(){
    MoviesService.toggleWatched(movieId);
  };

  $scope.isMovieWatched = function () {
    return MoviesService.isMovieWatched(movieId);
  };

})
