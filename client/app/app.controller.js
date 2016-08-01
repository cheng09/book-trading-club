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
    vm.setMenu = setMenu;
    vm.menu = vm.menu;
    vm.logout = logout;
    
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
    
    function logout() {
      console.log("logging out")
      vm.toggleSidenav();
      AuthenticationService.logout();
    }    
    
    var menuLoggedOut = [{
      title: "Home",
      icon: "home",
      link: "/home",
    }, {
      title: "Sign In",
      icon: "",
      link: "/login",
    }, {
      title: "Register",
      icon: "",
      link: "/register",
    }];
    
    var menuLoggedIn = [{
      title: "Everyone's Books",
      icon: "book",
      link: "/books",
    },{
      title: "Your Dashboard",
      icon: "account_circle",
      link: "/dashboard",
    },{
      title: "Books You Have",
      icon: "library_books",
      link: "/have",
    },{
      title: "Add Books You Have",
      icon: "library_add",
      link: "/search",
    },{
      title: "Books You Want",
      icon: "favorite",
      link: "/want"
    },{
      title: "Books You Are Trading",
      icon: "share",
      link: "/trades"
    },{
      title: "Update Settings",
      icon: "settings",
      link: "/settings",
    }];
  }
  
})();