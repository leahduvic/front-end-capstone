angular
	.module("capstone")
	.factory("eventFactory", function ($http, $location, authFactory) {
		return Object.create(null, {
			"cache": {
				value: null,
				writable: true
			},
			"list":{
				value: function () {
					return $http({
						method: "GET",
						url: "https://capstone-37810.firebaseio.com/events/.json"
					})
				}
			},
			"listByUser": {
				value: function () {
					return $http({
						method: "GET",
						url: "https://capstone-37810.firebaseio.com/events/.json"
					}).then(response => {
						const data = response.data
						let user = authFactory.getUser()	
						// Make an array of objects so we can use filters
						this.cache = Object.keys(data).map(key => {
							console.log(user)
							let object = data[key]
							console.log("obj", object)
							object.id = key
							if(object.uid === user.uid) {
								object.isCurrentUser = true
							}
							return object
						})
						return this.cache
					})
				}
			},
			"single": {
				value: function (key) {
					return $http({
						method: "GET",
						url: `https://capstone-37810.firebaseio.com/events/${key}/.json`
					}).then(response => {
						return response.data
					})
				}
			},
			"add": {
				value: function (event) {
					return $http({
						method: "POST",
						url: "https://capstone-37810.firebaseio.com/events/.json",
						data: event
					})
				}
			},
			"delete": {
				value: function (key) {
					return $http({
						method: "DELETE",
						url: `https://capstone-37810.firebaseio.com/events/${key}/.json`
					})
				}
			},
			"find": {
				value: function (searchString) {
					const result = this.cache.find(emp => {
						return emp.firstName.includes(searchString) ||
                           emp.lastName.includes(searchString)
					})
					return result
				}
			}
		})
	})			