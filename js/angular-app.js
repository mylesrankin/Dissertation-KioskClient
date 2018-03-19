var app = angular.module('kioskApp', []);


app.controller('kioskFrontScreen', function($scope) {
    $scope.test = 'test'
    var tiles = [
        {
            title: 'Example 1',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 2',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 3',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 4',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 5',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 6',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 7',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 8',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 9',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 10',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 11',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 12',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 13',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 13',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 14',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 15',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 16',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
        {
            title: 'Example 17',
            content: 'Some random desc',
            image: 'images/placeholder.png'
        },
    ];
    $scope.row1 = [];
    $scope.row2 = [];
    $scope.row3 = [];

    for (var i = 0; i < tiles.length; i++){
        console.log(tiles[i])
        if(tiles[i] !== null) {
            if (i <= 5) {
                $scope.row1.push(tiles[i])
            }
            if (i > 5 && i <= 11) {
                $scope.row2.push(tiles[i])
            }
            if (i > 11 && i < 17){
                $scope.row3.push(tiles[i])
            }
        }else{
            console.log('undef')
        }
        console.log($scope.row1)
    }

});