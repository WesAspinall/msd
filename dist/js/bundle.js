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
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange')
      .accentPalette('grey')
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
      }, {
        name: 'Hangout',
        icon: 'hangouts',
        icon_url: 'img/svg/hangouts.svg'
      }];

      this.performAction = function(action) {
        $mdBottomSheet.hide();
      };

    }
  }

}

angular
  .module('users')
  .controller('AppCtrl', AppCtrl);})(window.angular);
(function(angular){
'use strict';
AppService.$inject = ["$q"];
function AppService($q) {

  var users = [{
    name: 'Lia Lugo',
    avatar: 'svg-1',
    content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
  }, {
    name: 'George Duke',
    avatar: 'svg-2',
    content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
  }, {
    name: 'Gener Delosreyes',
    avatar: 'svg-3',
    content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
  }, {
    name: 'Lawrence Ray',
    avatar: 'svg-4',
    content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
  }, {
    name: 'Ernesto Urbina',
    avatar: 'svg-2',
    content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
  }, {
    name: 'Gani Ferrer',
    avatar: 'svg-4',
    content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
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