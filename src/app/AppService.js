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
  .service('AppService', AppService);