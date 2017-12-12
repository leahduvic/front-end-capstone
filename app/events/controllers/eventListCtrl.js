angular
	.module("capstone")
	.controller("eventListCtrl", function ($scope, eventFactory, $location, $routeParams, $window, authFactory) {
		$scope.events = []
		let currentUser = authFactory.getUser()
		let authenticated = authFactory.isAuthenticated()
		
		console.log(currentUser, authenticated)
		if (!currentUser) {
			eventFactory.list().then(data => {
				for (const key in data.data) {
					const ele = data.data[key]
					$scope.events.push(ele)
					console.log($scope.events)
				}
			})
		} else {
			eventFactory.listByUser().then(userData => {
				for (const key in userData) {
					const ment = userData[key]
					$scope.events.push(ment)
					console.log($scope.events)
						
					
				}
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
	
