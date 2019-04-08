var app = angular.module('albumModule',[]);
app.controller('albumControl',function($scope,$http) {
    
    
  /*   $scope.albuns = [
                {'codigo':'1',
                 'titulo':'gods of Violence',
                 'banda':'Kreator',
                 'gravadora':'Ward Records Inc.',
                'lancamento':' 27 de janeiro de 2017',
                'duracao':'51 minutos e 43 segundos',
                },
                 {'codigo':'2',
                 'titulo':'Allegiance',
                 'banda':'As Blood Runs Black',
                 'gravadora':'Castle Ultimate Studios',
                'lancamento':' 06 de junho de 2006',
                'duracao':'37 minutos e 4 segundos'
                }  ,       
            ]
*/
    var url = 'http://localhost:8080/albuns';

    $scope.pesquisar = function() {
        $http.get(url).then(function (response) {
            $scope.albuns= response.data;
        }, function (error) {
            alert(error);
            console.log(error);
        });
    }

    $scope.salvar = function() {
        if (typeof $scope.album.codigo == 'undefined') {            
            $http.post(url,$scope.album).then(function (response) {
                $scope.albuns.push(response.data);
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } else {
            $http.put(url,$scope.album).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            });
        } 
    }

    $scope.excluir = function() {
        if (typeof $scope.album.codigo == 'undefined') {
            alert('Escolha um álbum');
        } else {
            urlExcluir = url+"/"+$scope.album.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                alert(error);
                console.log(error);
            }); 
        }
    }
    
   

    $scope.novo = function() {
        $scope.album = {};
    }        

    $scope.seleciona = function(album) {
        $scope.album = album;
    }

    $scope.pesquisar();
    $scope.novo();

});