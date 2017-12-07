angular.module("capstone")
	.controller("eventCreateCtrl", function ($scope, eventFactory) {
		$scope.newEvent = {}
		$scope.events = []

		$scope.addEvent = function () {
			const event = {
				"eventName": $scope.newEvent.eventName,
				"eventLocation": $scope.newEvent.eventLocation,
				"eventDate": $scope.newEvent.eventDate,
				"eventInfo": $scope.newEvent.eventInfo,
				"uid": firebase.auth().currentUser.uid
			}

			eventFactory.add(event).then(() => {
				
				$scope.events.push(event)
				$scope.newEvent.eventName = ""
				$scope.newEvent.eventLocation = ""
				$scope.newEvent.eventDate = ""
				$scope.newEvent.eventInfo = ""
			})
		}
		eventFactory.list().then(data => {
			$scope.events = data
		})
	})