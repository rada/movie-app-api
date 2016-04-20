app.controller('MoviesListCtrl', function ($scope, $state, $http, GlobalService, MoviesService) {

    $scope.moreData = false;
    $scope.data = MoviesService.data;

    $scope.getNextMoviePage = function(){
      // console.log(++MoviesService.pageNum, Date())
      MoviesService.dataSource.getMovies(undefined, ++MoviesService.pageNum).then(function(){
      $scope.$broadcast('scroll.infiniteScrollComplete');
      });
      if(MoviesService.pageNum > 10) $scope.moreData = true;
    }

    $scope.getDataSourceMovies = function(){
      MoviesService.dataSource.getCredits(281957);
    }
})
