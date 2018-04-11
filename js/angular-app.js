var app = angular.module('kioskApp', []);


app.controller('kioskFrontScreen', function($scope) {
    $scope.tiles = []
    // Rows
    $scope.row1 = []
    $scope.row2 = []
    $scope.row3 = []
    $.ajax({
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("hardwareid", "test");
        },
        url: "http://localhost:3000/screen/adverts",
        success: function(data){
            $scope.tiles = data
            for (var i = 0; i < $scope.tiles.length; i++){
                $scope.tiles[i].Content = JSON.parse($scope.tiles[i].Content)
                if($scope.tiles[i] !== null) {
                    if (i <= 5) {
                        $scope.row1.push($scope.tiles[i])
                    }
                    if (i > 5 && i <= 11) {
                        $scope.row2.push($scope.tiles[i])
                    }
                    if (i > 11 && i < 18){
                        $scope.row3.push($scope.tiles[i])
                    }
                }else{
                    console.log("An error occured: Undefined index")
                }
            }
            $scope.$apply();
        }
    });


});