app.factory('GenreService', function($http, $rootScope, APP_CONFIG, $state, $resource){
  return new (function(){
    var service = this;
    service.data = {};
    service.dataSource = {};

    // service.getGenres = function(){
    //   var req = {
    //     method: "GET",
    //     url:    APP_CONFIG.getApiUrl("genres")
    //     //https://api.themoviedb.org/3/genre/movie/list?api_key=4aa883f95999ec813b8bfaf319f3972b
    //   };
    //   return $http(req).success(function(response){
    //     service.data.genres = response.genres;
    //     console.log("genres url called");
    //   }).error(function(err){
    //     console.error(err);
    //   })
    // }

    // service.getMoviesByGenre = function(genreId){
    //   var req ={
    //     method: "GET",
    //     url: APP_CONFIG.getApiUrl("moviesByGenre").replace(":genre_id", genreId)
    //     //http://api.themoviedb.org/3/genre/28/movies?api_key=4aa883f95999ec813b8bfaf319f3972b
    //   };
    //   // console.log(req.url);
    //   return $http(req).success(function(response){
    //     service.data.movies = response.results;
    //     console.log("Movies by genre called.");
    //   }).error(function(err){
    //     console.error(err);
    //   })
    // }

    service.dataSource.getGenres = function(){
      $resource(APP_CONFIG.getApiUrl("genres")).get({}, function(response){
        service.data.genres = response.genres;
      }, function(error){
        console.error("Error fetching genres: ", error);
      })
    }

    service.dataSource.getMoviesByGenre = function(genreId){
      $resource(APP_CONFIG.getApiUrl("moviesByGenre"), {genre_id: genreId}).get({},function(response){
        service.data.movies = response.results;
      }, function(error){
        console.error("Error fetching movies by genre: ", error);
      })
    }
  })()
})
