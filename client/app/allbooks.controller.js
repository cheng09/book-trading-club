(function(){
  
  angular
    .module('app')
    .controller('AllBooksCtrl', AllBooksCtrl);
  
  AllBooksCtrl.$inject = ['DataService', '$scope', '$mdToast'];
  
  function AllBooksCtrl(DataService, $scope, $mdToast) {
    var vm = this;
    vm.addToWishList = addToWishList;
    vm.removeFromWishList = removeFromWishList;
    vm.showToast = showToast;
    vm.wishListEligible = wishListEligible;
    $scope.userCollection = [];
    $scope.books;
    $scope.wishlist = [];
    

    (function() {
      getLibrary();
      getCollection();
    })();
    
    function getLibrary() {
      DataService.getAllBooks()
        .success(function(result) {
          $scope.books = result;
        });
    }
    
    function getCollection() {
      DataService.getCollection()
        .success(function(result) {
          result.forEach(function(book) {
            $scope.userCollection.push(book.id);
          });
        });
    }
    
    function addToWishList(book) {
      $scope.wishlist.push(book.id);
      DataService.addToWishList(book)
        .then(function(result){ 
          vm.showToast(book.title + ' added to your wishlist');
        });
    }
    
    function removeFromWishList(book) {
      $scope.wishlist.splice($scope.wishlist.indexOf(book.id),1);
      DataService.removeFromWishList(book)
        .success(function(result){ 
          vm.showToast(book.title + ' removed from your wishlist');
        });
    }
    
    function showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position('top right')
          .hideDelay(3000)
      );
    }
    
    function wishListEligible(book) {
      if ($scope.userCollection.indexOf(book.id) > -1) {
        return false;
      } else if ($scope.wishlist.indexOf(book.id) > -1 ) {
        return false;
      } else {
        return true;
      }
    }
    
  }  
  
})();