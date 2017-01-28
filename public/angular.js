/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-27 10:31:48
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-01-28 19:26:45
*/

var myContacts = angular.module('contactApp', []);

myContacts.controller('contactDetails',function($scope,$http,$window){
	
	$scope.loginDom = true;
	$scope.signUpDom = false;
	$scope.contactees = [];
	$scope.updateUser={};
	$scope.loginData = {}
	$scope.contactToSave = {};
	$scope.signupResponse = '';
	$scope.loggedUser = '';

	$scope.fetchData = function(){
		$http({
			method:"POST",
			url:'/getAllData',
			data:{"userID":$scope.loggedUser['_id']},
			headers:{'Content-Type':'application/json'}
		})
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

	$scope.init = function(){
		$scope.updateResponse = null;
		$scope.nameU = false;
		$scope.phoneU = false;
		$scope.saveContact = null;
		$scope.saveResponse = null;
		$scope.contactToSave = null;
		$scope.loginResponse = null;
		$scope.signupResponse = null;
	}

	$scope.updateContact = function(contact){
		$scope.updateResponse = null;
		if($scope.nameU || $scope.phoneU){
			var update = [];
			if($scope.nameU){	update.push('name');	}
			if($scope.phoneU){ 	update.push('phone');	}
			$scope.updateUser.update = update;
		}else{
			$scope.updateResponse = "Kindly Check anyone field to update";
			setTimeout($scope.init,2000);
			return;
		}

		if($scope.updateUser.name && $scope.updateUser.email && $scope.updateUser.phone){
			$http({
				method:'POST',
				url:"/update",
				data:$scope.updateUser,
				headers: {'Content-Type': 'application/json'}
			})
			.then(function(response){
				console.log(response.data);
				$scope.updateResponse = response.data.info;
				if(response.data.status == true){
					$scope.fetchData();
				}
			})
			.catch(function(reject){
				console.log(reject.data);
				$scope.updateResponse = reject.data.info;
			})
		}else{
			$scope.updateResponse = "Kindly fill all fields";
		}
		setTimeout($scope.init,2000);
	}

	$scope.deleteContact = function(contact){
		$http({
			method:"POST",
			url:"/delete",
			data:contact,
			headers: {'Content-Type': 'application/json'}
		})
		.then(function(response){
			alert(response.data.info);
			if(response.data.status == true){
				$scope.fetchData();
			}
		})
		.catch(function(reject){
			alert(response.data.info);
		})
	}

	$scope.saveContact = function(){
		if($scope.contactToSave.name && $scope.contactToSave.email && $scope.contactToSave.phone){
			$scope.contactToSave.userID = $scope.loggedUser['_id'];
			console.log($scope.contactToSav);
			$http({
				method:"POST",
				url:"/create",
				data:$scope.contactToSave,
				headers: {'Content-Type': 'application/json'}
			})
			.then(function(response){
				console.log(response.data);
				if(response.data.status == true){
					$scope.saveResponse = response.data.info;
					$scope.fetchData();
				}else{
					$scope.saveResponse = response.data.info;
				}
			})
			.catch(function(reject){
				console.log(reject.data);
				$scope.saveResponse = reject.data.info;
			})
		}else{
			$scope.saveResponse = "Kindly fill all fields";
		}
		// setTimeout($scope.init,2000);
	};

	$scope.loginStatus = function(){
		if(!$scope.loggedUser){
				$window.location.reload();
		}
	};

	$scope.loginUser = function(){
		if($scope.loginData.email && $scope.loginData.password){
			$http({
				method:"POST",
				url:'/login',
				data:$scope.loginData,
				headers: {'Content-Type': 'application/json'}
			})
			.then(function(response){
				console.log(response.data);
				if(response.data.status==false){
					$scope.loginResponse = " Invalid login credentials";
					return;
				}else{
					$scope.loggedUser = response.data;
					$scope.loginResponse = "Login Success Goto Dashboard"
					$scope.fetchData();
					return true;
				}
			})
			.catch(function(reject){
				$scope.loginResponse = "Unable to login try again"
			});
		}else{
			$scope.loginResponse = "Kindly fill all fields";
		}
	};

	$scope.signUpUser = function(){
		if($scope.loginData.name && 
		   $scope.loginData.phone &&
		   $scope.loginData.email &&
		   $scope.loginData.password){
			$http({
				method:"POST",
				url:"/createUser",
				data:$scope.loginData,
				headers: {'Content-Type': 'application/json'}
			})
				.then(function(response){
					console.log(response.data);
					$scope.signupResponse = response.data.info;
					if(response.data.status == true){
						$scope.signupResponse += " Kindly Login"
					}
				})
				.catch(function(reject){
					console.log(reject.data);
					$scope.signupResponse = reject.data.info;
				})
		}
	};
});






// myContacts.controller('updateData',function($scope,$http,$myService){
// 	console.log("--------------",$myService.msCont)
// 	$scope.updateUser = $myService.msCont;
// });


// myContacts.service('$myService',function(){
// 	this.msCont = {};
// });