angular.module("capstone").controller("navCtrl",
	function ($scope, $location, authFactory, eventFactory) {
	// authenticating the user
		$scope.isAuthenticated = () => authFactory.isAuthenticated()

		

		// $scope.finder = event => {
		// 	if (event.key === "Enter") {
		// 		const event = eventFactory.find($scope.searchString)
		// 		$location.url(`/events/eventList/${event.id}`)
		// 	}
		// }

		// removing authentication from user 
		$scope.logout = () => authFactory.logout()

	}
)