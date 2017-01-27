/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-25 15:23:40
* @Last Modified by:   noor
* @Last Modified time: 2017-01-25 18:36:48
*/

var myContactApp = angular.module('contactApp',[])
	.controller('appController',function($scope,$http){
		$http.post('/getAllData')
			.then(function(response){
				$scope.allData = response.data;
			})
			.catch(function(reject){
				console.log(reject.data);
			});
		$scope.val = 10;
	});