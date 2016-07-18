(function() {
  
  angular
    .module('app')
    .controller('ProfileCtrl', ProfileCtrl);
    
  ProfileCtrl.$inject = ['$location', 'DataService', '$scope', '$mdToast'];
  
  function ProfileCtrl($location, DataService, $scope, $mdToast) {
    var vm = this;
    vm.user = {};
    vm.collection = [];
    vm.remove = remove;
    vm.showToast = showToast;

    (function init() {
      vm.user = {};
      vm.collection = [];
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
    })();
    
    $scope.remove = function(array, index) {
      array.splice(index, 1)  
    };
    
    function remove(book) {
      DataService.removeFromCollection(book)
        .then(function(data) {
          console.log(data);
          $scope.remove(vm.collection, vm.collection.indexOf(book));
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