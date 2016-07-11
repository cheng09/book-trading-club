(function() {
 'use strict';

  angular.module('app', ['ngMaterial', 'ngRoute']);
  
  angular
   .module('app')
   .config(appConfiguration)
   
   function appConfiguration($mdThemingProvider, $routeProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink')
        .warnPalette('red');
        
      $routeProvider
        .when('/search', {
          controller: 'SearchCtrl',
          controllerAs: 'search',
          templateUrl: 'views/search.html'
        }).otherwise({
        // default page
          redirectTo: '/search'
        });
   };
  
})();