(function() {
  
  angular
    .module('app')
    .controller('SettingsCtrl', SettingsCtrl);
    
  SettingsCtrl.$inject = ['DataService', '$mdToast'];
  
  function SettingsCtrl(DataService, $mdToast){
    
    var vm = this;
    vm.user = {}
    vm.setProfile = setProfile;
    vm.showToast = showToast;
    
    (function(){
      DataService.getProfile()
        .then(function(result) {
          vm.user = result.data;
        });
    })();
    
    function setProfile(userMods) {
      console.log(JSON.stringify(userMods));
      DataService.setProfile(userMods)
        .then(function(result) {
          vm.user = result.data;
          vm.showToast('User profile updated')
        })
    }
    
    function showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position('top right')
          .hideDelay(3000)
      );
    };
  }
  
})();