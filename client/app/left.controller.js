(function() {
  
  angular
    .module('app')
    .controller('LeftCtrl', LeftCtrl);
  
  LeftCtrl.$inject = ['$mdSidenav'];
  
  function LeftCtrl($mdSidenav) {
    var vm = this;
  };
  
})();