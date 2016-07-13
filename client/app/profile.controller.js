(function() {
  
  angular
    .module('app')
    .controller('ProfileCtrl', ProfileCtrl);
    
  ProfileCtrl.$inject = ['$location', 'DataService', '$scope'];
  
  function ProfileCtrl($location, DataService, $scope) {
     var vm = this;

    vm.user = {};
    vm.collection = [];
    vm.remove = remove;

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
      DataService.remove(book)
        .then(function(data) {
          console.log(data);
          $scope.remove(vm.collection, vm.collection.indexOf(book));
        });
    }
  };
  
  
})();