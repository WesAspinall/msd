angular
  .module('app', [
    'templates', 'ngMaterial', 'users'
  ])
  .config(function($mdIconProvider, $mdThemingProvider) {
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
  });