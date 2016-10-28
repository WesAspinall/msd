angular
  .module('app', [
    'templates', 'ngMaterial'
  ])
  .config(function($mdIconProvider) {
    $mdIconProvider
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24);
      // .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      // .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      // .icon("twitter", "./assets/svg/twitter.svg", 24)
      // .icon("phone", "./assets/svg/phone.svg", 24);
  });