angular
	.module("capstone")
	.factory("eventFactory", function ($http, $location) {
		return Object.create(null, {
			"cache": {
				value: null,
				writable: true
			},
			"list": {
				value: function () {
					return $http({
						method: "GET",
						url: "https://capstone-37810.firebaseio.com/.json"
					}).then(response => {
						const data = response.data

						// Make an array of objects so we can use filters
						this.cache = Object.keys(data).map(key => {
							data[key].id = key
							return data[key]
						})
						return this.cache
					})
				}
			},
			"single": {
				value: function (key) {
					return $http({
						method: "GET",
						url: `https://capstone-37810.firebaseio.com/${key}/.json`
					}).then(response => {
						return response.data
					})
				}
			},
			"add": {
				value: function (event) {
					return $http({
						method: "POST",
						url: "https://capstone-37810.firebaseio.com/.json",
						data: event
					})
				}
			},
			"delete": {
				value: function (key) {
					return $http({
						method: "DELETE",
						url: `https://capstone-37810.firebaseio.com/${key}/.json`
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