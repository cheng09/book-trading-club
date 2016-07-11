(function() {
  
  angular
    .module('app')
    .controller('SearchCtrl', SearchCtrl);
    
  SearchCtrl.$inject = ['$mdToast', '$http'];
  
  function SearchCtrl($mdToast, $http) {
    var vm = this;
    vm.results = [];
    vm.collection = [];
    vm.search = search;
    vm.addBook = addBook;
    
    
  };
  
})();