(function() {
 'use strict';

  angular.module('app', ['ngMaterial', 'ngRoute']);
  
  angular
   .module('app')
   .config(['$mdThemingProvider', '$routeProvider', '$locationProvider', config])
   .run(['$rootScope', '$location', 'AuthenticationService', run]);
 
 function config($mdThemingProvider, $routeProvider, $locationProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('pink')
      .warnPalette('red');
      
    $routeProvider
      .when('/search', {
        controller: 'SearchCtrl',
        controllerAs: 'search',
        templateUrl: 'views/search.html'
      })
      .when('/register', {
        controller: 'RegisterCtrl',
        controllerAs: 'register',
        templateUrl: 'views/register.html'
      })
      .when('/login', {
        controller: 'LoginCtrl',
        controllerAs: 'login',
        templateUrl: 'views/login.html'
      })
      .when('/profile', {
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        templateUrl: 'views/profile.html'
      })
      .when('/books', {
        controller: 'AllBooksCtrl',
        controllerAs: 'allbooks',
        templateUrl: 'views/allbooks.html'
      })
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
      // default page
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  };

  function run($rootScope, $location, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !AuthenticationService.isLoggedIn()) {
        $location.path('/');
      } else if ($location.path() === '/' && AuthenticationService.isLoggedIn()) {
        $location.path('/profile');
      }
    });
  }
  
})();