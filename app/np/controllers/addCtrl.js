angular
	.module("capstone")
	.controller("addCtrl", function ($scope, $timeout, $location, npFactory, authFactory) {
		$scope.newOrg = {}
		$scope.organization = []

		$scope.addOrg = function () {
			const org = {
				"orgName": $scope.newOrg.orgName,
				"website": $scope.newOrg.website,
				"orgLocation": $scope.newOrg.orgLocation,
				"uid": firebase.auth().currentUser.uid
			}

			npFactory.add(org).then(() => {

				$scope.organization.push(org)
				$scope.newOrg.orgName = ""
				$scope.newOrg.website = "" 
				$scope.newOrg.orgLocation = ""
			})
			$timeout (() => {
				$location.url("/organization/list")
			}, 100)
		}
		npFactory.listByUser().then(data => {
			$scope.events = data
		})

	
	})