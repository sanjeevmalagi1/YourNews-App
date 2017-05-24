(function() {
  'use strict';

  angular
    .module('app.Directives')
    .directive('ynStory', ynStory);

  function ynStory() {
    return {
      templateUrl: 'app/Directives/Story/Story.html',
      restrict: 'E',
      controller: StoryController,
      controllerAs: 'vm',
      bindToController: true
      };
  }

  StoryController.$inject = ['$scope', '$state','ratingsService','HOST'];

  function StoryController($scope, $state,ratingsService,HOST) {

    $scope.upvote = function(){

      $scope.downvoted = false;
      $scope.upvoted =  true;

      ratingsService.upVote($scope.story.id,window.localStorage.getItem("userId"))
        .then(function(response){
          InterpretResult(response.data);
        });

      /*$.post(
        HOST+'index.php/Ratings/addPoint',
        {
          'newsId' : $scope.story.id,
          'userId' : window.localStorage.getItem("userId")
        },
        function(data,status){
          if(status == 'success'){
            InterpretResult(data);
          }
        }
      );*/

    }

    $scope.downvote = function(){
      $scope.downvoted = true;
      $scope.upvoted =  false;

      ratingsService.downVote($scope.story.id,window.localStorage.getItem("userId"))
        .then(function(response){
          InterpretResult(response.data);
        });


      /*$.post(
        HOST+'index.php/Ratings/removePoint',
        {
          'newsId' : $scope.story.id,
          'userId' : window.localStorage.getItem("userId")
        },
        function(data,status){
          if(status == 'success'){
            InterpretResult(data);
          }
        }
      );*/
    }

    $scope.markgood = function(){
      $scope.markedgood = true;
      $scope.markedbad = false;

      ratingsService.markGood($scope.story.id,window.localStorage.getItem("userId"))
        .then(function(response){
          InterpretResult1(response.data);
        });

      /*$.post(
        HOST+'index.php/Ratings/addGood',
        {
          'newsId' : $scope.story.id,
          'userId' : window.localStorage.getItem("userId")
        },
        function(data,status){
          if(status == 'success'){
            console.log(data);
            InterpretResult1(data);
          }
        }
      );*/
    }

    $scope.markbad = function(){
      $scope.markedbad = true;
      $scope.markedgood = false;

      ratingsService.markBad($scope.story.id,window.localStorage.getItem("userId"))
        .then(function(response){
          InterpretResult1(response.data);
        });

      /*$.post(
        HOST+'index.php/Ratings/addBad',
        {
          'newsId' : $scope.story.id,
          'userId' : window.localStorage.getItem("userId")
        },
        function(data,status){
          if(status == 'success'){
            InterpretResult1(data);
          }
        }
      );*/
    }

    function InterpretResult(data) {
      var result = data;

      if(result.action == "added"){
        $scope.story.points = parseInt($scope.story.points) + parseInt(result.points);
      }

      if(result.action == "removed"){
        $scope.story.points = parseInt($scope.story.points) - parseInt(result.points);
      }
      //$scope.$digest();
    }

    function InterpretResult1(data) {
      var result = data;

      if(result.type == "good" && result.action == "added"){
          if(result.previous){
            $scope.story.bad = parseInt($scope.story.bad) - parseInt(1);
          }
          $scope.story.good = parseInt($scope.story.good) + parseInt(1);
      }

      if(result.type == "bad" && result.action == "added"){
          if(result.previous){
            $scope.story.good = parseInt($scope.story.good) - parseInt(1);
          }
          $scope.story.bad = parseInt($scope.story.bad) + parseInt(1);
      }

      if(result.type == "bad" && result.action == "removed"){
        $scope.story.bad = parseInt($scope.story.bad) - parseInt(1);
      }

      if(result.type == "good" && result.action == "removed"){
        $scope.story.good = parseInt($scope.story.good) - parseInt(1);
      }
      //$scope.$digest();
    }
  }



})();
