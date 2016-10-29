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
  .controller('AppCtrl', AppCtrl);