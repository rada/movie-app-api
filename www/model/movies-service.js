app.factory('MoviesService', function ($rootScope, $http, $state, $ionicLoading, APP_CONFIG, $resource) {
    return new (function () {
        var service = this;
        service.data = {};
        service.dataSource = {};
        service.pageNum = 1;

        service.dataSource.getCredits = function(movieId){
          var credits = $resource(APP_CONFIG.getApiUrl("movieCredits"), {id: movieId}).get({}, function(response){
            service.data.credits = response.cast;
          }, function(error){
            console.error("Erro getting movie credits: ", error);
          })
        }

        service.dataSource.getMovies = function(callback, pageNum) {
          var movies = $resource(APP_CONFIG.getApiUrl("moviesPopular", pageNum)).get({},function(response){
            // console.log("Popular movies response: ", response);
            if(pageNum == 1){service.data.movies = response.results}
            else {service.data.movies = service.data.movies.concat(response.results)}
            if(callback) callback();
          }, function(error){
            console.error("Error getting popular movies.", error);
          });
          return movies.$promise;
        }

        service.dataSource.getMovieById = function(movieId){
          service.data.selectedMovie = $resource(APP_CONFIG.getApiUrl("movieById"), {id: movieId}).get();
          return service.data.selectedMovie.$promise;
        }

        service.getChartData = function(movie){
          var data = [], labels = [];
          labels = movie.genres.map(function(genre){
            data.push(1);
            return genre.name;
          });
          return {labels: labels, data: data};
        }

        service.watchedMovies = [];

        service.toggleWatched = function (id) {
          var occurenceIndex = service.watchedMovies.indexOf(id);
          if (~occurenceIndex)
            service.watchedMovies.splice(occurenceIndex, 1);
          else
            service.watchedMovies.push(+id);
          localStorage.setItem("watched_movies", JSON.stringify(service.watchedMovies));
        };

        service.isMovieWatched = function (movieId){
          return !!~service.watchedMovies.indexOf(movieId);
        }
        service.getWatchedMoviesFromStorage = function(){
          try{
            service.watchedMovies = JSON.parse(
              localStorage.getItem("watched_movies")
            ) || [];
          } catch(e){
            console.warn("Invalid JSON string", e);
          }
          return service.watchedMovies;
        }

        service.dataSource.getMovies(function(){
          service.getWatchedMoviesFromStorage();
        }, service.pageNum);
    })();
});
