var app = angular.module('mdm-ui', ['schemaForm']);
app.controller('FormController', function($scope, $http) {
  $scope.schema = {};
  $scope.form = ["*"];
  $scope.model = {};
  $scope.$watch('schemaJson',function(val,old){
    if (val && val !== old) {
      try {
        $scope.getSchema(JSON.parse($scope.schemaJson));
      } catch (e){
        console.log('unable to set schema');
      }
    }
  });
  $scope.$watch('formJson',function(val,old){
    if (val && val !== old) {
      try {
        $scope.getForm(JSON.parse($scope.formJson));
      } catch (e){
        console.log('unable to set form');
      }
    }
  });
  $scope.pretty = function() {
    return JSON.stringify($scope.model, undefined, 2, 2);
  };

  $scope.getSchema=function(val) {
    $scope.schema=val;
  };
  $scope.getForm = function(val) {
    $scope.form = val;
  };

  $scope.loadSchemaFromFile = function() {
    var response = $http.get("schema.json");
    response.success(function(data)
    {
      $scope.schemaJson = JSON.stringify(data, undefined, 2, 2);
    });
  };

  $scope.loadFormFromFile = function() {
    var response = $http.get("form.json");
    response.success(function(data)
    {
      $scope.formJson = JSON.stringify(data, undefined, 2, 2);
    });
  };
});

