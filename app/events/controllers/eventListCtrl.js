angular
	.module("capstone")
	.controller("eventListCtrl", function ($scope, eventFactory, $location, $routeParams, $window, authFactory) {
		$scope.events = []
		let currentUser = authFactory.getUser()
		let authenticated = authFactory.isAuthenticated()
		
		console.log(currentUser, authenticated)
		if (!currentUser) {
			eventFactory.list().then(data => {
				$scope.events = data.data
				console.log(data)
			})
		} else {
			eventFactory.listByUser().then(userData => {
				$scope.events = userData
				console.log(userData)
			})
		}

		$scope.deleteEvent = (event) => {
			$scope.events = $scope.events.filter(function (evnt) {
				return evnt !== event
			})
			console.log(event.id)
			eventFactory.delete(event.id).then(() => {
				$location.url("#!/event/list")
			})
		}
		$scope.outside = function (url) {
			$window.open(url)
		}

		$scope.search = function (find) {
			
		}
	})
	
