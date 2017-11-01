var app = window.angular.module('app', [])

app.controller('mainCtrl', mainCtrl)

function mainCtrl ($scope, $http) {
    $scope.board = [];
    $scope.playerNumber = 1;

    $scope.makeTurn = function (xCord,yCord) {
        var turnObj = {x : xCord, y: yCord, player: $scope.playerNumber};

        $http({
            url: 'turn',
            method: "POST",
            data: turnObj
        }).success(function(data, status, headers, config) {
            console.log("Post worked");
        }).error(function(data, status, headers, config) {
            console.log("Post failed");
        });
    };

    $scope.getBoard = function () {

    }
}
