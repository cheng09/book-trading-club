(function() {
  
  angular
    .module('app')
    .controller('SearchCtrl', SearchCtrl);
    
  SearchCtrl.$inject = ['$mdToast', '$http', 'AuthenticationService', 'DataService'];
  
  function SearchCtrl($mdToast, $http, AuthenticationService, DataService) {
    var vm = this;
    vm.results = [];
    vm.collection = [];
    vm.search = search;
    vm.addBook = addBook;
    vm.showToast = showToast;
    vm.inCollection = inCollection;
    vm.currentUser = AuthenticationService.currentUser();

    function search(term) {
      var url = '/api/search/' + encodeURIComponent(term);
      $http.get(url).then(function(data){
        vm.results = data.data;
      });
    }
    
   function showToast(msg) {
    $mdToast.show(
      $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(3000)
      );
    };
    
    function addBook(book) {
      DataService.addToCollection(book)
        .then(function(bookid) {
          showToast('Added ' + book.title + ' to your collection.');
          vm.collection.push(bookid);
        })
    }
    
    function inCollection(book) {
      if (vm.collection.indexOf(book.id) === -1) {
        return false;
      } else {
        return true;
      }
    }
  };
  
})();