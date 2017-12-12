angular.module("capstone")
	.controller("npListCtrl", function ($scope, npFactory, $location, $timeout, authFactory) {
		$scope.organizations = []


		let currentUser = authFactory.getUser()
		let authenticated = authFactory.isAuthenticated()

		if (!currentUser) {
			npFactory.list().then(data => {
				$scope.organization = data.data
				console.log(data)
			})
		} else {
			npFactory.listByUser().then(userData => {
				$scope.organization = userData
				console.log(userData)
			})
		}

		$scope.deleteOrg = (event) => {
			$scope.organizations = $scope.organizations.filter(function (ogz) {
				return ogz !== event
			})
			npFactory.delete(event.id)
				.then(() => {
					$location.url("#!/organization/list")
				})
		}
		
	})