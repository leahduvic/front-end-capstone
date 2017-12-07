const app = angular.module("capstone", ["ngRoute"])

angular.module("capstone").run(function (FIREBASE_CONFIG) {
	firebase.initializeApp(FIREBASE_CONFIG)
})

let isAuth = authFactory => new Promise ((resolve, reject) => {

	if (authFactory.isAuthenticated()){
		console.log("User is authenticated, resolve route promise")
		resolve()
	} else {
		console.log("User is not authenticated, reject route promise")
		reject()
	}
})

angular.module("capstone").config(function ($routeProvider) {
   
	$routeProvider
		.when("/", {
			templateUrl: "app/auth/partials/non-auth.html"
		})
		.when("/event/list", {
			templateUrl: "app/events/partials/eventList.html",
			controller: "eventListCtrl"
		})
		.when("/events/new", {
			templateUrl: "app/events/partials/create.html",
			controller: "eventCreateCtrl",
			resolve: { isAuth }
		})
		// .when("/event/detail/:eventId", { 
		// 	templateUrl: "app/employees/partials/detail.html",
	// 	controller: "EmployeeDetailCtrl"
	// resolve: { isAuth }
	// })
		.when("/auth", {
			templateUrl: "app/auth/partials/auth.html",
			controller: "authCtrl"
		})
		.otherwise("/")
})