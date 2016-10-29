(function(angular){
'use strict';
angular
  .module('app', [
    'templates', 'ngMaterial', 'users'
  ])
  .config(["$mdIconProvider", "$mdThemingProvider", function($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
      .defaultIconSet("./img/svg/avatars.svg", 128)
      .icon("menu", "./img/svg/menu.svg", 24)
      .icon("share", "./img/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./img/svg/hangouts.svg", 24)
      .icon("twitter", "./img/svg/twitter.svg", 24)
      .icon("phone", "./img/svg/phone.svg", 24)
      .icon("plum","./img/svg/plum-blossoms.svg", 24);
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('red')
  }]);})(window.angular);
(function(angular){
'use strict';
angular
  .module('users', ['ngMaterial']);})(window.angular);
(function(angular){
'use strict';
AppCtrl.$inject = ["$scope", "$mdBottomSheet", "$mdSidenav", "AppService"];
function AppCtrl($scope, $mdBottomSheet, $mdSidenav, AppService) {
  var ctrl = this;

  ctrl.selected = null;
  ctrl.users = [];
  ctrl.selectUser = selectUser;
  ctrl.toggleList = toggleList;
  ctrl.share = share;



  function toggleList() {
    $mdSidenav('left').toggle();
  }

  AppService
    .loadAllUsers()
    .then(function(users) {
      ctrl.users = [].concat(users);
      ctrl.selected = users[0];
      console.log(ctrl.users);
    });

  function selectUser(user) {
    ctrl.selected = angular.isNumber(user) ? $scope.users[user] : user;
  }

  function share(selectedUser) {
    $mdBottomSheet.show({
      controller: BottomSheetCtrl,
      controllerAs: 'vm',
      templateUrl: './bottomsheet.html',
      parent: angular.element(document.querySelector('#content'))
    });

    function BottomSheetCtrl() {
      this.user = selectedUser;
      this.items = [{
        name: 'Phone',
        icon: 'phone',
        icon_url: 'img/svg/phone.svg'
      }, {
        name: 'Twitter',
        icon: 'twitter',
        icon_url: 'img/svg/twitter.svg'
      }, {
        name: 'Google+',
        icon: 'google_plus',
        icon_url: 'img/svg/google_plus.svg'
      }];

      this.performAction = function(action) {
        $mdBottomSheet.hide();
      };

    }
  }

}

angular
  .module('app')
  .controller('AppCtrl', AppCtrl);})(window.angular);
(function(angular){
'use strict';
AppService.$inject = ["$q"];
function AppService($q) {

  var users = [{
    name: 'Home',
    avatar: '../img/svg/plum-blossom.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam interdum ex, id tempor purus aliquet quis. Curabitur nec ultricies turpis. Sed gravida nisl porttitor, iaculis risus vel, consequat eros. Vestibulum vel ornare ligula. Ut rutrum urna id vulputate interdum. Nunc eget purus eros. Aliquam id facilisis justo.'
  }, {
    name: 'Sifu Edgar',
    avatar: '../img/svg/plum-blossom.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam interdum ex, id tempor purus aliquet quis. Curabitur nec ultricies turpis. Sed gravida nisl porttitor, iaculis risus vel, consequat eros. Vestibulum vel ornare ligula. Ut rutrum urna id vulputate interdum. Nunc eget purus eros. Aliquam id facilisis justo.'

  }, {
    name: 'Cirriculum',
    avatar: '../img/svg/plum-blossom.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam interdum ex, id tempor purus aliquet quis. Curabitur nec ultricies turpis. Sed gravida nisl porttitor, iaculis risus vel, consequat eros. Vestibulum vel ornare ligula. Ut rutrum urna id vulputate interdum. Nunc eget purus eros. Aliquam id facilisis justo.'

  }, {
    name: 'Media',
    avatar: '../img/svg/plum-blossom.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam interdum ex, id tempor purus aliquet quis. Curabitur nec ultricies turpis. Sed gravida nisl porttitor, iaculis risus vel, consequat eros. Vestibulum vel ornare ligula. Ut rutrum urna id vulputate interdum. Nunc eget purus eros. Aliquam id facilisis justo.'

  }, {
    name: 'Contact',
    avatar: '../img/svg/plum-blossom.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam interdum ex, id tempor purus aliquet quis. Curabitur nec ultricies turpis. Sed gravida nisl porttitor, iaculis risus vel, consequat eros. Vestibulum vel ornare ligula. Ut rutrum urna id vulputate interdum. Nunc eget purus eros. Aliquam id facilisis justo.'

  }];

  return {
    loadAllUsers: function() {
      // Simulate async nature of real remote calls
      return $q.when(users);
    }
  };

}

angular
  .module('app')
  .service('AppService', AppService);})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./bottomsheet.html','<md-bottom-sheet><md-subheader>contact: <span class="name">{{vm.user.name}}</span></md-subheader><md-list><md-item ng-repeat="item in vm.items"><md-button ng-click="vm.performAction() "><md-icon md-svg-icon="{{item.icon_url}}"></md-icon>{{item.name}}</md-button></md-item></md-list></md-bottom-sheet>');}]);})(window.angular);