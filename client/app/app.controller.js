(function() {
  
  angular
    .module('app')
    .controller('AppCtrl', AppCtrl);
  
  AppCtrl.$inject = ['$mdSidenav'];
  
  function AppCtrl($mdSidenav) {
    var vm = this;
    vm.menu = menu;
    
    var menu = [{
      link: '/search',
      title: 'Search',
      icon: 'search'
    },
    {
      link: '/books',
      title: 'All Books',
      icon: 'library books'
    }];
  };
  
})();