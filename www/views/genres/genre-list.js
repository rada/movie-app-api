app.controller("GenreListCtrl", function($scope, $http, GenreService){
    $scope.selectedGenre = {};
    $scope.data = GenreService.data;

    GenreService.dataSource.getGenres();

    $scope.getGenreMovies = function(genreId){
      GenreService.dataSource.getMoviesByGenre($scope.selectedGenre.id)
    }
})
