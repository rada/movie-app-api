/**
 * The main application module.
 */

var app = angular.module('App', ['ionic', 'ngCordova', 'ui.router', 'ngResource', 'chart.js'])

    .run(function ($ionicPlatform, $http, $ionicSideMenuDelegate, $ionicScrollDelegate, $rootScope, $ionicLoading) {
        $http.defaults.headers.post = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "dataType": "json"
        };


        /**
         * @description Workaround for closing side menu in Android
         */
        document.addEventListener('touchstart', function (event) {
            if ($ionicSideMenuDelegate.isOpenLeft()) {
                event.preventDefault();
            }
        });


        /**
         * @description DEVICE READY
         */
        $ionicPlatform.ready(function ($cordovaGlobalization) {
            setTimeout(function () {
                navigator.splashscreen && navigator.splashscreen.hide();
            }, 100);
            console.info("DEVICE READY");
            if (window.cordova && window.cordova.plugins.Keyboard) {
                try {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    cordova.plugins.Keyboard.disableScroll(true);

                } catch (e) {
                    console.error("Hide keyboard fail");
                }
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });

        $rootScope.$on('loading:show', function() {
          $ionicLoading.show({template: "Loading...<ion-spinner icon=\"spiral\"></ion-spinner>"})
        })

        $rootScope.$on('loading:hide', function() {
          $ionicLoading.hide()
        })
    })
    .factory('authInterceptorService', ['$q', '$location', '$window', '$injector', function ($q, $location, $window, $injector) {
        var responseError = function (rejection) {
            if (rejection.status === 401) {
                $injector.get('$rootScope').$broadcast("applicationStatus", "unauthorized");
            }
            return $q.reject(rejection);
        };
        return {
            responseError: responseError
        };
    }]);

    app.config(function($httpProvider) {
      $httpProvider.interceptors.push(function($rootScope) {
        return {
          request: function(config) {
            $rootScope.$broadcast('loading:show')
            return config
          },
          response: function(response) {
            $rootScope.$broadcast('loading:hide')
            return response
          }
        }
      })
    })
;
