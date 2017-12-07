angular.module("capstone")
	.controller("authCtrl", function($scope, $location, authFactory) {
		$scope.auth = {}
        
		$scope.loginUser = function (credentials) {
			authFactory.authenticate(credentials).then(function (didLogin) {
				$scope.login = {}
				$scope.register = {}
				$location.url("/auth")
			})
		}

		$scope.logoutUser = function(){
			authFactory.logout()
			$location.url("/auth")
		}

		$scope.registerUser = function(registerNewUser) {
			authFactory.registerWithEmail(registerNewUser).then(function(didRegister) {
			})
		}
	})