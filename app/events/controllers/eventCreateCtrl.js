angular.module("capstone")
	.controller("eventCreateCtrl", function ($scope, eventFactory, $location, $timeout) {
		$scope.newEvent = {}
		$scope.events = []

		$scope.addEvent = function () {
			const event = {
				"eventName": $scope.newEvent.eventName,
				"website": $scope.newEvent.website,
				"eventLocation": $scope.newEvent.eventLocation,
				"eventDate": $scope.newEvent.eventDate,
				"eventInfo": $scope.newEvent.eventInfo,
				"uid": firebase.auth().currentUser.uid
			}

			eventFactory.add(event).then(() => {
				
				$scope.events.push(event)
				$scope.newEvent.eventName = ""
				$scope.newEvent.website = ""
				$scope.newEvent.eventLocation = ""
				$scope.newEvent.eventDate = ""
				$scope.newEvent.eventInfo = ""
			})
			$timeout(() => {
				$location.url("/event/list")
			}, 100)
			
		}
		eventFactory.listByUser().then(data => {
			$scope.events = data
		})

	})