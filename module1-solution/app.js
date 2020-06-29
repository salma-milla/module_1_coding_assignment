(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.menu = "";
    $scope.message = "";
    $scope.exception_message = "";
    $scope.border_color = "";
    $scope.text_color = "";

    $scope.displayMessage = function () {
      var result = checkLunchItems($scope.menu);
      $scope.message = result[0];
      $scope.exception_message = result[1];
      $scope.border_color = {
        borderColor: result[2]
      }
      $scope.text_color = {
        color: result[3]
      }
    };
  }

  function checkLunchItems (items) {
    var exception_message = "";
    if(items == "")
      return ["Please enter data first", exception_message, "#cc0605", "#cc0605"];
    else {
      var lunchItems = items.split(",");
      var invalidDoubleCommaItems = items.split(",,");
      var invalidCommaSpaceCommaItems = items.split(", ,");
      var invalidCommaSpaceItems = items.split(", ");
      var totalLunchItems = lunchItems.length -
                            (invalidDoubleCommaItems.length - 1) -
                            (invalidCommaSpaceCommaItems.length - 1) -
                            (invalidCommaSpaceItems.length - 1);
      if((invalidDoubleCommaItems.length - 1) >= 1 ||
         (invalidCommaSpaceCommaItems.length - 1) >= 1 ||
         (invalidCommaSpaceItems.length - 1) >= 1 ||
         (lunchItems[lunchItems.length - 1]) == "")
        exception_message = "NOT considered an empty item, (e.i. , ,) for the count";
      if(lunchItems[lunchItems.length - 1] == "")
        totalLunchItems = totalLunchItems - 1;
      if (totalLunchItems <= 3){
        return ["Enjoy!", exception_message, "#64b92d", "#64b92d"];
      }
      else if (totalLunchItems > 3){
        return ["Too much!", exception_message, "#64b92d", "#64b92d"];
      }
    }
  }
})();
