var app = angular.module('kioskApp', []);


app.controller('kioskFrontScreen', function($scope) {
    $scope.test = 'test'

    $.ajax({
        type: "GET",
        beforeSend: function(request){
            request.setRequestHeader("hardwareid", "test");
        },
        url: "http://localhost:3000/screen/adverts",
        success: function(data){
            var tiles = data
            $scope.row1 = [];
            $scope.row2 = [];
            $scope.row3 = [];

            for (var i = 0; i < tiles.length; i++){
                tiles[i].Content = JSON.parse(tiles[i].Content)
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
            }
            console.log($scope.row1)

            window.addEventListener('load', function(){
                var button = document.getElementsByClassName("modal-click");
                console.log(button)
                for (i=0; i < 6; i++){
                    button[i].addEventListener('click', function(){
                        var modal = document.getElementById("modal-"+this.dataset.modal);
                        modal.style.display = "block";
                        document.getElementById("close-"+this.dataset.modal).addEventListener('click', function(){
                            modal.style.display = "none";
                        })
                    })
                }
            })

        }
    })

});