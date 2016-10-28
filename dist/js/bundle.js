(function(angular){
'use strict';
angular
  .module('app', [
    'templates', 'ngMaterial'
  ])
  .config(["$mdIconProvider", function($mdIconProvider) {
    $mdIconProvider
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24);
      // .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      // .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      // .icon("twitter", "./assets/svg/twitter.svg", 24)
      // .icon("phone", "./assets/svg/phone.svg", 24);
  }]);})(window.angular);
(function(angular){
'use strict';
AppCtrl.$inject = ["$mdSidenav"];
function AppCtrl($mdSidenav) {
  
  function toggleList() {
    $mdSidenav('left').toggle();
  }
};

angular
  .module('app')
  .controller('AppCtrl', AppCtrl);})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root"><div id="root-view" class="container ui-view-component-fix" layout="column" flex ui-view></div></div>');}]);})(window.angular);