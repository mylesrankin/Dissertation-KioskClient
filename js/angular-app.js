var app = angular.module('kioskApp', []);


app.controller('kioskFrontScreen', function($scope, $timeout, $interval, $http) {
    new Fingerprint2().get(function (result) {
        localStorage.hardwareid= result
        $scope.HID = result

        $http({
            url: "http://127.0.0.1:3000/screen/check-hid",
            method: "POST",
            headers: {"hardwareid": localStorage.hardwareid},
        }).then(function successCallback(res) {
            document.getElementById('unauth').remove()
            console.log(res)
            if (res.data.status == true) {
                $interval(function () {
                    $.ajax({
                        url: "http://localhost:3000/screen/heartbeat",
                        type: "POST",
                        beforeSend: function (request) {
                            request.setRequestHeader("hardwareid", localStorage.hardwareid);
                        },
                        success: function () {
                            console.log('Heartbeat sent.')
                        }
                    })
                }, 5000)
                $scope.tiles = []
                // Rows
                $scope.row1 = []
                $scope.row2 = []
                $scope.row3 = []
                $.ajax({
                    type: "GET",
                    beforeSend: function (request) {
                        request.setRequestHeader("hardwareid", localStorage.hardwareid);
                    },
                    url: "http://localhost:3000/screen/adverts",
                    success: function (data) {
                        $scope.tiles = data
                        for (var i = 0; i < $scope.tiles.length; i++) {
                            $scope.tiles[i].Content = JSON.parse($scope.tiles[i].Content)
                            if ($scope.tiles[i] !== null) {
                                if (i <= 5) {
                                    $scope.row1.push($scope.tiles[i])
                                }
                                if (i > 5 && i <= 11) {
                                    $scope.row2.push($scope.tiles[i])
                                }
                                if (i > 11 && i < 18) {
                                    $scope.row3.push($scope.tiles[i])
                                }
                            } else {
                                console.log("An error occured: Undefined index")
                            }
                        }
                        $scope.$apply();
                    }
                })

                $scope.submitResponse = function (advertID, previousBtn) {
                    console.log(advertID)
                    console.log(document.getElementById("advert-" + advertID + "-form-name").value)
                    $http({
                        url: "http://127.0.0.1:3000/response",
                        method: "POST",
                        headers: {"hardwareid": localStorage.hardwareid},
                        data: {
                            "Name": document.getElementById("advert-" + advertID + "-form-name").value,
                            "Email": document.getElementById("advert-" + advertID + "-form-email").value,
                            "OriginAdvertID": advertID
                        }
                    }).then(function successCallback(res) {
                        document.getElementById("advert-" + advertID + "-btn").innerHTML = "Response recorded, thank you."
                        document.getElementById("advert-" + advertID + "-form-name").disabled = "true"
                        document.getElementById("advert-" + advertID + "-form-email").disabled = "true"
                        document.getElementById("advert-" + advertID + "-btn").className = "btn btn-lg btn-danger btn-block"

                        $timeout(function () {
                            document.getElementById("advert-" + advertID + "-btn").innerHTML = previousBtn
                            document.getElementById("advert-" + advertID + "-form-name").disabled = ""
                            document.getElementById("advert-" + advertID + "-form-email").disabled = ""
                            document.getElementById("advert-" + advertID + "-btn").className = "btn btn-lg btn-success btn-block"
                        }, 5000)
                    }, function errorCallback(res) {
                        console.log(res)
                    })
                }

                $scope.incrementImpression = function (advertID) {
                    console.log("Incrementing " + advertID)
                    $http({
                        url: "http://127.0.0.1:3000/screen/impression",
                        method: "POST",
                        headers: {"hardwareid": localStorage.hardwareid},
                        data: {
                            "advertid": advertID
                        }
                    })
                }

            }
        }, function errorCallback(){
            console.log("Oh no, this screen isn't registered!")
            document.getElementById('unauth').style.display = "";
            document.getElementById('auth-btn').addEventListener('click', function(){
                if((document.getElementById('token-p1').value.length)+(document.getElementById('token-p2').value.length)+(document.getElementById('token-p3').value.length)<9){
                    alert("Error: Please fill out the token boxes fully! (3 characters each box, 9 total)")
                }else {
                    var token = (document.getElementById('token-p1').value)+ "-" +(document.getElementById('token-p2').value)+ "-" +(document.getElementById('token-p3').value)
                    $http({
                        url: "http://127.0.0.1:3000/screens/"+token,
                        method: "POST",
                        headers: {"hardwareid": localStorage.hardwareid}
                    }).then(function successCallback(res) {
                        alert(res.data.status)
                        location.reload()
                    }, function errorCallback(res){
                        console.log(res)
                        alert(res.data)
                    })

                }
            })
        })
    })
});