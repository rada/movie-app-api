app.controller('ProfileCtrl', function($scope, $stateParams, ProfileService){
  $scope.data = {};
  $scope.data.user = ProfileService.getUserFromLS() || {};

  $scope.updateUser = function(userDetails){
    $scope.data.user = angular.copy(userDetails);
    ProfileService.saveUsertoLS($scope.data.user);
    console.log($scope.data.user);
  }

  $scope.getUserPic = function(){
    ProfileService.getUserPic();
  }
})
