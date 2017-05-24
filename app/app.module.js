(function() {
  'use strict';

  angular
    .module('app', [
      // Angular modules.
      'ngRoute',
      'ui.router',
      'ngMap',
      'infinite-scroll',
      // Custom modules.
      'app.Core',
      'app.Directives',
      //'app.Control',
      //'app.User',
      'app.Dashboard',
      'app.Sections',
      //'app.WebSite',
      //'app.LogsInfo'
      ])
    .config(configFunction)
    .constant('HOST','http://yournews.16mb.com/')
    .run(runFunction);


  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    //http://yournews.16mb.com/
    //http://localhost/yourNews/
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

  runFunction.$inject = ['$rootScope', '$location','HOST'];

  function runFunction($rootScope, $location,HOST) {
    var UserId = window.localStorage.getItem("userId");
    console.log(UserId);
    if(!UserId){
      $.post(
        HOST+'index.php/User/AddUser',
        {
          'null' : null
        },
        function(data,status){
          if(data && status == 'success'){
            var result = JSON.parse(data);
            console.log(result);
            window.localStorage.setItem("userId",result)
          }
        }
      );
    }

  }

})();
