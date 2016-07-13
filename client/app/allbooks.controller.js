(function(){
  
  angular
    .module('app')
    .controller('AllBooksCtrl', AllBooksCtrl);
  
  AllBooksCtrl.$inject = ['DataService', '$scope'];
  
  function AllBooksCtrl(DataService, $scope) {
    
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    $scope.loadMore = function() {
      var last = $scope.images[$scope.images.length - 1];
      for(var i = 1; i <= 10; i++) {
        $scope.images.push(last + i);
      }
    };
    
    (function init() {
      DataService.getAllBooks()
        .success(function(result) {
          $scope.books = result;
        });
    })();  
  }
  
})();