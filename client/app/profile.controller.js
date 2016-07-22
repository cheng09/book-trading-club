(function() {
  
  angular
    .module('app')
    .controller('ProfileCtrl', ProfileCtrl);
    
  ProfileCtrl.$inject = ['$location', 'DataService', '$scope', '$mdToast'];
  
  function ProfileCtrl($location, DataService, $scope, $mdToast) {
    var vm = this;
    vm.user = {};
    vm.collection = [];
    vm.wishlist = [];
    vm.pending = [];
    vm.removeFromCollection = removeFromCollection;
    vm.removeFromWishlist = removeFromWishlist;
    vm.showToast = showToast;

    (function init() {
      vm.user = {};
      vm.collection = [];
      vm.wishlist = [];
      vm.pending = [];
      DataService.getProfile()
        .success(function(data) {
          vm.user = data;
        })
        .error(function (e) {
          console.log(e);
        });

      DataService.getCollection()
        .success(function(data) {
          vm.collection = data;
        })
        .error(function (e) {
          console.log(e);
        });
        
      DataService.getWishlist()
        .success(function(data) {
          vm.wishlist = data;
        })
        .error(function(e) {
          console.log(e);
        })
        
      DataService.getPending()
        .success(function(data) {
          vm.pending = data;
          console.log(vm.pending);
        })
        .error(function(e) {
          console.log(e);
        })
    })();
    
    $scope.remove = function(array, index) {
      array.splice(index, 1)  
    };
    
    function removeFromCollection(book) {
      DataService.removeFromCollection(book)
        .then(function(data) {
          console.log(data);
          $scope.remove(vm.collection, vm.collection.indexOf(book));
        });
    }
    
    function removeFromWishlist(book) {
      DataService.removeFromWishlist(book)
        .then(function(data) {
          console.log(data);
          $scope.remove(vm.wishlist, vm.wishlist.indexOf(book));
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
  };
  
})();