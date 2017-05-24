(function() {
  'use strict';

  angular
    .module('app.Sections')
    .controller('SectionsController', SectionsController);

  SectionsController.$inject = ['$scope','$state','$stateParams','$location','$anchorScroll','newsTypeService','newsService','HOST'];

  function SectionsController($scope,$state,$stateParams,$location,$anchorScroll,newsTypeService,newsService,HOST) {
    $scope.page = 0;
    $scope.stories = [];
    $scope.$watch(function () { return newsTypeService.getCurrentType(); }, function (newValue, oldValue) {
       if (newValue != null) {
         $scope.type = newValue;
         $scope.stories = [];
         $scope.page = 0;
         $scope.loadMore();
       }
   }, true);

   $scope.loadMore =  function(){
     newsService.getSectionNews($scope.page,$stateParams.section,$scope.type).then(function(response){
       for (var Story of response.data) {
         $scope.stories.push(Story);
       }
       $scope.page = $scope.page+10;
     });
   }
  }



})();
