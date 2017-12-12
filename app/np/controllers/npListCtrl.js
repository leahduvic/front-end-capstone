angular.module("capstone")
	.controller("npListCtrl", function ($scope, npFactory, $location, $timeout, authFactory) {
		$scope.organizations = []


		let currentUser = authFactory.getUser()
		let authenticated = authFactory.isAuthenticated()

		if (!currentUser) {
			npFactory.list().then(data => {
				for (const key in data.data) {
					const element = data.data[key]
					$scope.organizations.push(element)
					console.log($scope.organizations)
				}
			})
		} else {
			npFactory.listByUser().then(userData => {
				for (const key in userData) {
					const el = userData[key]
					$scope.organizations.push(el)
					console.log($scope.organizations)
				}
			}
			)
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