angular
	.module("capstone")
	.factory("npFactory", function ($http, $location, authFactory) {
		return Object.create(null, {
			"cache": {
				value: null,
				writable: true
			},
			"list":{
				value: function () {
					return $http({
						method: "GET",
						url: "https://capstone-37810.firebaseio.com/non-profits/.json"
					})
				}
			},
			"listByUser": {
				value: function () {
					return $http({
						method: "GET",
						url: "https://capstone-37810.firebaseio.com/non-profits/.json"
					}).then(response => {
						const data = response.data

						// Make an array of objects so we can use filters
						this.cache = Object.keys(data).map(key => {
							let object = data[key]
							console.log("obj", object)
							object.id = key
							if(object.uid === firebase.auth().currentUser.uid) {
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
						url: `https://capstone-37810.firebaseio.com/non-profits/${key}.json`
					}).then(response => {
						return response.data
					})
				}
			},
			"add": {
				value: function (org) {
					return $http({
						method: "POST",
						url: "https://capstone-37810.firebaseio.com/non-profits/.json",
						data: org
					})
				}
			},
			"delete": {
				value: function (key) {
					return $http({
						method: "DELETE",
						url: `https://capstone-37810.firebaseio.com/non-profits/${key}/.json`
					})
				}
			},
			"find": {
				value: function (searchString) {
					const result = this.cache.find(info => {
						return info.orgName.includes(searchString) ||
                       info.orgLocation.includes(searchString)
					})
					return result
				}
			}
		})
	})