(function() {
  'use strict';

  angular
    .module('app.Directives')
    .directive('ynAddStory', ynAddStory);

  function ynAddStory() {
    return {
      templateUrl: 'app/Directives/AddStory/AddStory.html',
      restrict: 'E',
      controller: AddStoryController,
      controllerAs: 'vm',
      bindToController: true

      };
  }

  AddStoryController.$inject = ['$scope','$location','$anchorScroll','newsService','HOST'];

  function AddStoryController($scope,$location,$anchorScroll,newsService,HOST) {
    $scope.submit = function(){

      newsService.addNews($scope.heading,$scope.description,$scope.link,$scope.type)
        .then(function(response){
          $scope.heading = "";
    			$scope.description = "";
    			$scope.link = "";
    			$scope.type = "";
        });

      /*$.post(
        HOST+'index.php/News/AddNewsByUser',
        {
          'heading' : $scope.heading,
          'body' : $scope.description,
          'link' : $scope.link,
          'Type' : $scope.type
        },
        function(data,status){
			$scope.heading = "";
			$scope.description = "";
			$scope.link = "";
			$scope.type = "";
          console.log(data);
        }
      );*/
    }

    function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('#image').attr('src', e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

  $("#imgInp").change(function(){
      readURL(this);
  });
 }

})();
