(function() {
  'use strict';

  angular
    .module('app.Core')
    .factory('newsService', newsService);

  newsService.$inject = ['$http','$state','HOST'];

  function newsService($http,$state,HOST) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    var service = {
      getNews : getNews,
      getSectionNews : getSectionNews,
      addNews : addNews
    };

    return service;

    ////////////

    function getNews(page,type){
      return $http({
        method: 'POST',
        url: HOST+'index.php/News/GetAllNews',
        dataType: 'json',
        data: serialize(
                {
                  "page":page,
                  "type":type
                }
              ),
      }).success( function(response) {
        return response;
      });
    }

    function getSectionNews(page,section,type){
      return $http({
        method: 'POST',
        url: HOST+'index.php/News/GetSectionNews',
        dataType: 'json',
        data: serialize(
                {
                  "page":page,
                  "section":section,
                  "type":type
                }
              ),
      }).success( function(response) {
        return response;
      });
    }

    function addNews(heading,body,link,Type){
      return $http({
        method: 'POST',
        url: HOST+'index.php/News/AddNewsByUser',
        dataType: 'json',
        data: serialize(
                {
                  "heading" : heading,
                  "body" : body,
                  "link" : link,
                  "Type" : Type
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
