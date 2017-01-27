/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-27 10:31:48
* @Last Modified by:   noor
* @Last Modified time: 2017-01-27 17:43:42
*/

var myContacts = angular.module('contactApp', []);

myContacts.controller('contactDetails',function($scope,$http,$window){
	// $http.post('/getAllData')
	// 	.then(function(response){
	// 		$scope.contactees = response.data;
	// 	})
	// 	.catch(function(reject){
	// 		console.log(reject.data);
	// 	});
	$scope.contactees = [];
	$scope.updateUser={};
	$scope.loginData = {}
	// $scope.contactToSave = {};
	// $scope.contactToUpdate = {};
	// $scope.contactToDelete = {};

	$scope.fetchData = function(){
		$http.post('/getAllData')
			.then(function(response){
				$scope.contactees = response.data;
			})
			.catch(function(reject){
				console.log(reject.data);
			});
	};

	$scope.formFill = function(contact){
		$scope.updateUser = contact;
	}

	$scope.updateContact = function(contact){
		//http.post
	}

	$scope.deleteContact = function(contact){
		//http.post
	}

	$scope.saveContact = function(){
		// $http.post
	}

	$scope.loginStatus = function(){
		if(!$scope.loggedUser){
				$window.location.reload();
		}
	}
	$scope.loginUser = function(){
		if($scope.loginData.email && $scope.loginData.password){
			$http({
				method:"POST",
				url:'/login',
				data:$scope.loginData,
				headers: {'Content-Type': 'application/json'}
			})
			.then(function(response){
				if(response.data.status==false){
					$scope.loginResponse = " Invalid login credentials";
					$scope.message = " Refresh the page to Login Again"
					return;
				}else{
					$scope.loginResponse = null;
					$scope.loginError = null;
					$scope.message = null;
					$scope.loggedUser = response.data;
					console.log($scope.loggedUser);
					$scope.msgSuccess = "Login Success Goto Dashboard"
					$scope.fetchData();
					return true;
				}
			})
			.catch(function(reject){
				$scope.loginError = " Unable to Login";
				$scope.message = " Refresh the page to Login Again";
			});
		}else{
			$window.location.reload();
		}
	}

});






// myContacts.controller('updateData',function($scope,$http,$myService){
// 	console.log("--------------",$myService.msCont)
// 	$scope.updateUser = $myService.msCont;
// });


// myContacts.service('$myService',function(){
// 	this.msCont = {};
// });