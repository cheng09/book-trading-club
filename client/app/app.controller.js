(function() {
  
  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);
  
  AppCtrl.$inject = ['$mdSidenav', 'AuthenticationService'];
  
  function AppCtrl($mdSidenav, AuthenticationService) {
    var vm = this;
    vm.toggleSidenav = toggleSidenav;
    vm.isLoggedIn = AuthenticationService.isLoggedIn();
    vm.currentUser = AuthenticationService.currentUser();
    vm.logout = AuthenticationService.logout();
    vm.setMenu = setMenu;
    vm.menu = vm.menu;
    
    function toggleSidenav() {
      vm.setMenu();
      $mdSidenav("left").toggle();
    }
    
    function setMenu() {
      if (AuthenticationService.isLoggedIn()) {
        vm.menu = menuLoggedIn;
      }  else {
        vm.menu = menuLoggedOut;
      }
    }
    
    
 
    
    var menuLoggedOut = [{
      title: "Home",
      icon: "home",
      link: "/home"
    }, {
      title: "Sign In",
      icon: "",
      link: "/login"
    }, {
      title: "Register",
      icon: "",
      link: "/register"
    }];
    
    var menuLoggedIn = [{
      title: "All Books",
      icon: "book",
      link: "/books",
    },{
      title: "Your Collection",
      icon: "library_books",
      link: "/profile"
    },{
      title: "Add Books",
      icon: "library_add",
      link: "/search"
    },{
      title: "Update Settings",
      icon: "settings",
      link: "/settings"
    },{
      title: "Sign Out",
      icon: "power_settings_new",
      link: "/logout"
    }]
  };
  
})();