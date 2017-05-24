(function() {
  'use strict';

  angular
    .module('app.Dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope','$state','$location','$anchorScroll','newsTypeService','newsService','HOST'];

  function DashboardController($scope,$state,$location,$anchorScroll,newsTypeService,newsService,HOST) {
    $scope.stories = [];
    
    $scope.stories = [];
    $scope.page = 0;
    $scope.$watch(function () { return newsTypeService.getCurrentType(); }, function (newValue, oldValue) {
       if (newValue != null) {
          $scope.type = newValue;
          $scope.stories = [];
          $scope.page = 0;
          $scope.loadMore();
       }
   }, true);

   $scope.loadMore =  function(){
     newsService.getNews($scope.page,$scope.type).then(function(response){
       for (var Story of response.data) {
         $scope.stories.push(Story);
       }
       $scope.page = $scope.page+10;
     });
   }

  }




})();
