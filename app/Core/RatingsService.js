(function() {
  'use strict';

  angular
    .module('app.Core')
    .factory('ratingsService', ratingsService);

  ratingsService.$inject = ['$http','$state','HOST'];

  function ratingsService($http,$state,HOST) {
    //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    var service = {
      upVote : upVote,
      downVote : downVote,
      markGood : markGood,
      markBad : markBad
    };

    return service;

    ////////////

    function upVote(newsId,userId){
      return $http({
        method: 'POST',
        url: HOST+'index.php/Ratings/addPoint',
        dataType: 'json',
        data: serialize(
                {
                  'newsId' : newsId,
                  'userId' : userId
                }
              ),
      }).success( function(response) {
        return response;
      });
    }

    function downVote(newsId,userId){
      return $http({
        method: 'POST',
        url: HOST+'index.php/Ratings/removePoint',
        dataType: 'json',
        data: serialize(
                {
                  'newsId' : newsId,
                  'userId' : userId
                }
              ),
      }).success( function(response) {
        return response;
      });
    }

    function markGood(newsId,userId){
      return $http({
        method: 'POST',
        url: HOST+'index.php/Ratings/addGood',
        dataType: 'json',
        data: serialize(
                {
                  'newsId' : newsId,
                  'userId' : userId
                }
              ),
      }).success( function(response) {
        return response;
      });
    }

    function markBad(newsId,userId){
      return $http({
        method: 'POST',
        url: HOST+'index.php/Ratings/addBad',
        dataType: 'json',
        data: serialize(
                {
                  'newsId' : newsId,
                  'userId' : userId
                }
              ),
      }).success( function(response) {
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
