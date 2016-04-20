app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $resourceProvider, APP_CONFIG) {
    $httpProvider.interceptors.push('authInterceptorService');

    $stateProvider
        .state('movieMenu', {
          url: "/sidemenu",
          abstract: true,
          templateUrl: "views/sidemenu/sidemenu.html"
        })
        .state('movieMenu.popularMovies',{
          url: "/popularMovies",
          views: {
            'menuContent': {
              templateUrl: "views/movies/movies-list.html",
              controller: "MoviesListCtrl"
            }
          }
        })
        .state('movieMenu.genreMovies',{
          url: "/genreMovies",
          views: {
            'menuContent': {
              templateUrl: "views/genres/movies-genre.html",
              controller: "GenreListCtrl"
            }
          }
        })
        .state('movieMenu.movies-detail', {
          url: "/movies/:id?ref",
          views: {
            'menuContent': {
              templateUrl: "views/movies/movies-detail.html",
              controller: "MoviesDetailCtrl"
            }
          }
        })
        .state('movieMenu.profile', {
          url: "/profile",
          views: {
            'menuContent': {
              templateUrl: "views/profile/profile.html",
              controller: "ProfileCtrl"
            }
          }
        })
        // .state('movies', {
        //     url: '/movies',
        //     templateUrl: "views/movies/movies-list.html",
        //     controller: 'MoviesListCtrl'
        // })
        // .state('movies-detail', {
        //   url: "/movies/:id?ref",
        //   templateUrl: "views/movies/movies-detail.html",
        //   controller: "MoviesDetailCtrl"
        // })
        // .state('movies-genre',{
        //   url: "movies/genre",
        //   templateUrl: "views/genres/movies-genre.html",
        //   controller: "GenreListCtrl"
        // })
        // states end
    ;

    $urlRouterProvider.otherwise("/sidemenu/popularMovies");

});
