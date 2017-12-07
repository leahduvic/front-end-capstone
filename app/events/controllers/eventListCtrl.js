angular
	.module("capstone")
	.controller("eventListCtrl", function ($scope, eventFactory) {
		$scope.events = []

		eventFactory.list(true).then(data => {
			$scope.events = data
		})
	})