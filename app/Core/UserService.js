(function() {
  'use strict';

  angular
    .module('app.Core')
    .factory('userService', userService);

  userService.$inject = ['$state','$http','HOST'];

  function userService($state,$http,HOST) {
    var UserId = window.localStorage.getItem("userId");
    var service = {
      getUserId : getUserId,
      RegisterUser: RegisterUser
    };

    return service;

    ////////////
    function getUserId(){
        return window.localStorage.getItem("userId");
    }

    function RegisterUser(){
      return $http({
        method: 'POST',
        url: HOST+'index.php/User/AddUser',
        dataType: 'json',
        data: serialize(
                {
                  'null' : null
                }
              ),
      }).success( function(response) {

		window.localStorage.setItem("userId",response.data);
		return response;
      });

    }

    function serialize(obj){
      var str = "";
      for (var key in obj) {
          if (str != "") {
              str += "&";
          }
          str += key + "=" + encodeURIComponent(obj[key]);
      }
      return str;
    }

  }

})();
