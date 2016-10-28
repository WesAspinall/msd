function AppCtrl($mdSidenav) {
  
  function toggleList() {
    $mdSidenav('left').toggle();
  }
};

angular
  .module('app')
  .controller('AppCtrl', AppCtrl);