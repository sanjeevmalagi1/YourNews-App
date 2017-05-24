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
    .constant('HOST','http://yournews.16mb.com/')
    .run(runFunction);


  runFunction.$inject = ['$rootScope', '$location','userService','HOST'];

  function runFunction($rootScope, $location,userService,HOST) {
	//window.localStorage.removeItem("userId");
    var UserId = userService.getUserId();
    console.log(UserId);
    if(!UserId){
      userService.RegisterUser()
        .then(function(response){
          if(response.data){
            console.log(response);
            window.localStorage.setItem("userId",response.data)
          }
        });
      /*$.post(
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
      );*/
    }

  }

})();
