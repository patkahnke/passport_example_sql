myApp.controller('SkillsController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
$scope.skills = [];
$scope.user = {};
$scope.currentSkill = {};

getUser();
getSkills();

  // This happens after view/controller loads -- not ideal
  console.log('checking user');

  function getUser (){
    $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.user = response.data;
          return $scope.user;




      } else {
          $location.path("/home");
      }
  });
};

$scope.submitCurrentSkill = function (id) {
  var data = $scope.currentSkill;
  $http.put('/user/' + id + '/skills', data).then(function () {
    console.log('PUT /skills');
    console.log('id', id);
    getSkills();
  })
};

function getSkills () {
  $http.get('/skills').then(function(response) {
  $scope.skills = response.data.skills;
  console.log('updated skill', $scope.skills);
  })
};


  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }
}]);
