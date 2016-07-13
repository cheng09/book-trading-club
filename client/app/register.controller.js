(function() {
  
  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);
    
  RegisterCtrl.$inject = ['$location', 'AuthenticationService'];
  
  function RegisterCtrl($location, AuthenticationService) {
    var vm = this;
    vm.credentials = credentials;
    vm.onSubmit = onSubmit;
    
    var credentials = {
      name: "",
      email: "",
      password: ""
    };
    
    function onSubmit() {
      AuthenticationService 
        .register(vm.credentials)
        .error(function(err) {
          alert(err);
        })
        .then(function() {
          $location.path('profile');
        });
    };
    
  };
  
})();