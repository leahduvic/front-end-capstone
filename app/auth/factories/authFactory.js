angular.module("capstone")
	.factory("authFactory", function($http, $timeout, $location, $route) {
		let currentUserData = null
    
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				currentUserData = user
				$route.reload()
				console.log("User is authenticated")

				$timeout(function () {
					$location.url("/events/list")
				}, 100)
    
			} else {
				currentUserData = null
				console.log("User is not authenticated")
				$timeout(function () {
					$location.url("/")
				}, 100)
			}
		})

		return Object.create(null, {
			isAuthenticated: {
				value: () => {
					return firebase.auth().currentUser ? true : false
				}
			},
			getUser: {
				value: () => {
					return firebase.auth().currentUser
				}
			},
			logout: {
				value: () => {
					firebase.auth().signOut()
				}
			},
			authenticate: {
				value: credentials => {
					return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
				}
			},
			registerWithEmail: {
				value: user => {
					return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
				}
			}
		})
	})