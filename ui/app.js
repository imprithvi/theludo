
var app = angular.module("app", ['ngResource', 'ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 
	'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);
	//'ngMaterial', 'ngMessages']);

app

  .config(function($mdIconProvider) {
	$mdIconProvider
       .iconSet('action', 'img/icons/sets/action-icons.svg', 24)
       //.defaultIconSet('img/icons/sets/core-icons.svg', 24);
  })
  
  .config(function($mdThemingProvider) {
	$mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();
  })
  
  .config(function ($httpProvider) {

	$httpProvider.interceptors.push(function ($timeout, $q, $injector) {
	var loginModal, $http, $state;

	// this trick must be done so that we don't receive
	// `Uncaught Error: [$injector:cdep] Circular dependency found`
	$timeout(function () {
	  loginModal = $injector.get('loginModal');
	  $http = $injector.get('$http');
	  $state = $injector.get('$state');
	});

	return {
	  responseError: function (rejection) {
		if (rejection.status !== 401) {
		  return rejection;
		}

		var deferred = $q.defer();

		loginModal()
		  .then(function () {
			deferred.resolve( $http(rejection.config) );
		  })
		  .catch(function () {
			$state.go('welcome');
			deferred.reject(rejection);
		  });

		return deferred.promise;
	  }
	};
	});
  })

  .config(function ($stateProvider, $urlRouterProvider) {
	  
	$urlRouterProvider.otherwise("/home");
	
	$stateProvider
		.state('home', {
			url: '/home',
			onEnter: ['$state', function($state) { console.log('entering home'); }],
			onExit:  ['$state', function($state) { console.log('leaving home'); }],
			views: {
				"viewHome": {
					templateUrl: 'partials/home.html',
					controller: function($scope, $rootScope, $state) {
					},
				}
			},
			data: {
				requireLogin: false,
				//authorizedRoles: [USER_ROLES.superuser, USER_ROLES.admin, USER_ROLES.player],
				//isAuthenticated: true
			}
		})
		.state('userProfileDashboard', {
			url: '/userProfileDashboard',
			onEnter: ['$state', function($state) { console.log('entering dashboard'); }],
			onExit:  ['$state', function($state) { console.log('leaving dashboard'); }],
			views: {
				"viewUserProfileDashboard": {
						templateUrl: 'partials/userProfileDashboard.html',
						controller: function($scope, $rootScope, $state, $timeout, $window, $q, $location, $anchorScroll) { //, AuthService) {
							$scope.page = "DASHBOARD PAGE";
							
							// USER
							$scope.username = $rootScope.currentUser;
							$scope.user = {};
							$scope.user.name = "test";
							$scope.user.email = "test@example.com";
							$scope.user.phone = "987653271";
							$scope.user.chips = "30";
							$scope.user.birthday = Date.now();
							
							$scope.play2 = function() {
								console.log('running game.js');
								$state.go('gameView');
								$location.hash("'body'");
								$anchorScroll();
							};
							
						},
						controllerAs: '$userProfileDashboard'
				}
			},
			data: { requireLogin: false }
		})
/*
		.state('dashgridlist', {
			url: '/dashboard',
			onEnter: ['$state', function($state) { console.log('entering dashboard'); }],
			onExit:  ['$state', function($state) { console.log('leaving dashboard'); }],
			views: {
				"dashgridlist": {
						templateUrl: 'partials/dashgridlist.html',
						controller: function($scope, $rootScope, $state, $timeout, $window, $q, $location, $anchorScroll) { //, AuthService) {
							$scope.page = "DASHBOARD PAGE";
							
							// USER
							$scope.username = $rootScope.currentUser;
							$scope.user = {};
							$scope.user.name = "test";
							$scope.user.email = "test@example.com";
							$scope.user.phone = "987653271";
							$scope.user.chips = "30";
							$scope.user.birthday = Date.now();
							
							$scope.play2 = function() {
								console.log('running game.js');
								$state.go('game');
								$location.hash("'body'");
								$anchorScroll();
							};
							
						},
						controllerAs: '$dashgridlist'
				}
			},
			data: { requireLogin: false }
		})
*/
		.state('dashboard', {
			url: '/dashboard',
			onEnter: ['$state', function($state) { console.log('entering dashboard'); }],
			onExit:  ['$state', function($state) { console.log('leaving dashboard'); }],
			views: {
				"viewDash": {
						templateUrl: 'partials/dash.html',
						controller: function($scope, $rootScope, $state, $timeout, $window, $q, $location, $anchorScroll) { //, AuthService) {
							$scope.page = "DASHBOARD PAGE";
							
							// USER
							$scope.username = $rootScope.currentUser;
							$scope.user = {};
							$scope.user.name = "test";
							$scope.user.email = "test@example.com";
							$scope.user.phone = "987653271";
							$scope.user.chips = "30";
							$scope.user.birthday = Date.now();
							
							// TABLES
							$scope.tables = [
								{ no: 1, amount: 5, players: 2, play:true },
								{ no: 2, amount: 5, players: 2, play:false },
								{ no: 3, amount: 5, players: 4, play:false }
							];
							tables5RS = [
								{ no: 1, amount: 5, players: 2, play:true },
								{ no: 2, amount: 5, players: 2, play:false },
								{ no: 3, amount: 5, players: 4, play:false }
							];
							tables10RS = [
								{ no: 1, amount: 10, players: 2, play:true },
								{ no: 2, amount: 10, players: 2, play:false },
								{ no: 3, amount: 10, players: 4, play:false },
								{ no: 4, amount: 10, players: 2, play:false },
								{ no: 5, amount: 10, players: 4, play:false },
								{ no: 6, amount: 10, players: 2, play:false },
								{ no: 7, amount: 10, players: 4, play:false }
							];
							tables20RS = [
								{ no: 1, amount: 20, players: 2, play:true },
								{ no: 2, amount: 20, players: 2, play:false },
								{ no: 3, amount: 20, players: 4, play:false },
								{ no: 4, amount: 20, players: 2, play:false },
								{ no: 5, amount: 20, players: 4, play:false }
							];
							tables100RS = [
								{ no: 1, amount: 100, players: 2, play:true },
								{ no: 2, amount: 100, players: 2, play:false },
								{ no: 3, amount: 100, players: 4, play:false },
								{ no: 4, amount: 100, players: 2, play:false },
								{ no: 5, amount: 100, players: 4, play:false },
								{ no: 6, amount: 100, players: 2, play:true },
								{ no: 7, amount: 100, players: 2, play:false },
								{ no: 8, amount: 100, players: 4, play:false },
								{ no: 9, amount: 100, players: 2, play:false },
								{ no: 10,amount: 100, players: 4, play:false }
							];
							tables500RS = [
								{ no: 1, amount: 500, players: 2, play:true },
								{ no: 2, amount: 500, players: 2, play:false },
								{ no: 3, amount: 500, players: 4, play:false },
								{ no: 4, amount: 500, players: 2, play:false },
								{ no: 5, amount: 500, players: 4, play:false },
								{ no: 6, amount: 500, players: 2, play:true },
								{ no: 7, amount: 500, players: 2, play:false },
								{ no: 8, amount: 500, players: 4, play:false }
							];
							tables1000RS = [
								{ no: 1, amount: 1000, players: 2, play:true },
								{ no: 2, amount: 1000, players: 2, play:false },
								{ no: 3, amount: 1000, players: 4, play:false },
								{ no: 4, amount: 1000, players: 2, play:false },
								{ no: 5, amount: 1000, players: 4, play:false },
								{ no: 6, amount: 1000, players: 2, play:true },
								{ no: 7, amount: 1000, players: 2, play:false }
							];
							
							tablesPrivate = [
								{ no: 1, amount: 3000, players: 2, play:true },
								{ no: 2, amount: 4000, players: 2, play:false },
								{ no: 3, amount: 100, players: 4, play:false },
								{ no: 4, amount: 400, players: 2, play:false },
								{ no: 5, amount: 10000, players: 4, play:false },
								{ no: 6, amount: 5000, players: 2, play:true },
								{ no: 7, amount: 1000, players: 2, play:false }
							];
							
							//openCity('userInfo');
							$scope.submit2 = function() {
								console.log('dashboard: logging out');
								$rootScope.currentUser = undefined;
								$state.go('home');
							};
							$scope.play2 = function() {
								console.log('running game.js');
								$state.go('game');
								$location.hash("'body'");
								$anchorScroll();
							};
							$scope.switch = function(note) {
								console.log('switch');
								if (note === 5)
									$scope.tables = tables5RS;
								if (note === 10)
									$scope.tables = tables10RS;
								if (note === 20)
									$scope.tables = tables20RS;
								if (note === 100)
									$scope.tables = tables100RS;
								if (note === 500)
									$scope.tables = tables500RS;
								if (note === 1000)
									$scope.tables = tables1000RS;
								if (note === 10000)
									$scope.tables = tablesPrivate;
							};
						},
						controllerAs: '$dash'
				}
			},
			data: { requireLogin: true }
		})
		.state('gameDashboard', {
			url: '/gameDashboard',
			onEnter: ['$state', function($state) { console.log('entering gameDashboard'); }],
			onExit:  ['$state', function($state) { console.log('leaving gameDashboard'); }],
			views: {
				"viewGameDashboard": {
						templateUrl: 'partials/gameDashboard.html',
						controller: function($scope, $rootScope, $state, $timeout, $window, $q, $location, $anchorScroll) { //, AuthService) {
							$scope.page = "GAME DASHBOARD PAGE";
							
							// USER
							$scope.username = $rootScope.currentUser;
							$scope.user = {};
							$scope.user.name = "test";
							$scope.user.email = "test@example.com";
							$scope.user.phone = "987653271";
							$scope.user.chips = "30";
							$scope.user.birthday = Date.now();
							
							// TABLES
							$scope.tables = [
								{ no: 1, amount: 5, players: 2, play:true },
								{ no: 2, amount: 5, players: 2, play:false },
								{ no: 3, amount: 5, players: 4, play:false }
							];
							tables5RS = [
								{ no: 1, amount: 5, players: 2, play:true },
								{ no: 2, amount: 5, players: 2, play:false },
								{ no: 3, amount: 5, players: 4, play:false }
							];
							tables10RS = [
								{ no: 1, amount: 10, players: 2, play:true },
								{ no: 2, amount: 10, players: 2, play:false },
								{ no: 3, amount: 10, players: 4, play:false },
								{ no: 4, amount: 10, players: 2, play:false },
								{ no: 5, amount: 10, players: 4, play:false },
								{ no: 6, amount: 10, players: 2, play:false },
								{ no: 7, amount: 10, players: 4, play:false }
							];
							tables20RS = [
								{ no: 1, amount: 20, players: 2, play:true },
								{ no: 2, amount: 20, players: 2, play:false },
								{ no: 3, amount: 20, players: 4, play:false },
								{ no: 4, amount: 20, players: 2, play:false },
								{ no: 5, amount: 20, players: 4, play:false }
							];
							tables100RS = [
								{ no: 1, amount: 100, players: 2, play:true },
								{ no: 2, amount: 100, players: 2, play:false },
								{ no: 3, amount: 100, players: 4, play:false },
								{ no: 4, amount: 100, players: 2, play:false },
								{ no: 5, amount: 100, players: 4, play:false },
								{ no: 6, amount: 100, players: 2, play:true },
								{ no: 7, amount: 100, players: 2, play:false },
								{ no: 8, amount: 100, players: 4, play:false },
								{ no: 9, amount: 100, players: 2, play:false },
								{ no: 10,amount: 100, players: 4, play:false }
							];
							tables500RS = [
								{ no: 1, amount: 500, players: 2, play:true },
								{ no: 2, amount: 500, players: 2, play:false },
								{ no: 3, amount: 500, players: 4, play:false },
								{ no: 4, amount: 500, players: 2, play:false },
								{ no: 5, amount: 500, players: 4, play:false },
								{ no: 6, amount: 500, players: 2, play:true },
								{ no: 7, amount: 500, players: 2, play:false },
								{ no: 8, amount: 500, players: 4, play:false }
							];
							tables1000RS = [
								{ no: 1, amount: 1000, players: 2, play:true },
								{ no: 2, amount: 1000, players: 2, play:false },
								{ no: 3, amount: 1000, players: 4, play:false },
								{ no: 4, amount: 1000, players: 2, play:false },
								{ no: 5, amount: 1000, players: 4, play:false },
								{ no: 6, amount: 1000, players: 2, play:true },
								{ no: 7, amount: 1000, players: 2, play:false }
							];
							
							tablesPrivate = [
								{ no: 1, amount: 3000, players: 2, play:true },
								{ no: 2, amount: 4000, players: 2, play:false },
								{ no: 3, amount: 100, players: 4, play:false },
								{ no: 4, amount: 400, players: 2, play:false },
								{ no: 5, amount: 10000, players: 4, play:false },
								{ no: 6, amount: 5000, players: 2, play:true },
								{ no: 7, amount: 1000, players: 2, play:false }
							];
							
							//openCity('userInfo');
							$scope.submit2 = function() {
								console.log('dashboard: logging out');
								$rootScope.currentUser = undefined;
								$state.go('home');
							};
							$scope.play2 = function() {
								console.log('running game.js');
								$state.go('gameView');
								$location.hash("'body'");
								$anchorScroll();
							};
							$scope.switch = function(note) {
								console.log('switch');
								if (note === 5)
									$scope.tables = tables5RS;
								if (note === 10)
									$scope.tables = tables10RS;
								if (note === 20)
									$scope.tables = tables20RS;
								if (note === 100)
									$scope.tables = tables100RS;
								if (note === 500)
									$scope.tables = tables500RS;
								if (note === 1000)
									$scope.tables = tables1000RS;
								if (note === 10000)
									$scope.tables = tablesPrivate;
							};

							
						},
						controllerAs: '$gameDashboard'
				}
			},
			data: { requireLogin: false }
		})
		.state('gameView', {
			url: '/gameView',
			onEnter: ['$state', function($state) { console.log('entering game'); }],
			onExit:  ['$state', function($state) { console.log('leaving game'); }],
			views: {
				"viewGame": {
					templateUrl: 'partials/game.html',
					controller: function($scope) {
						$scope.page = "game view";
						console.log("opening game view");
						initScene();
					},
				}
			},
			data: { requireLogin: true }
		})
/*
		.state('login', {
			url: '/login',
			onEnter: ['$state', function($state) { console.log('entering login'); }],
			onExit:  ['$state', function($state) { console.log('leaving login'); }],
			views: {
				"viewLogin": {
					templateUrl: 'partials/login.html',
				
					controller: function($scope, $rootScope, $state, $timeout, $q) { //, AuthService) {
						$scope.page = "login form";
						$scope.loginData = {};
						$scope.loginData.email = "test@example.com";
						$scope.loginData.username = "test";
						$scope.loginData.password = "eueueueu";
						$scope.login = function(regData) {
							console.log('calling authService');
							var defer = $q.defer();
							$timeout(function() {
								defer.resolve('data received!');
							}, 5000);
							console.log('client ' + $scope.loginData.username  + ' logged in');
							$rootScope.currentUser = $scope.loginData.username;
							$state.go('dashboard');
						};
						
						var apiKey = 'AIzaSyCS6E__FsG206GJUh6wWgP6oz0QVCWBpCU';
						var clientId = '898129103079-df2a6vsnvtfvsv3l41vdjkipvvd60aoo.apps.googleusercontent.com';
						var scopes = 'profile';
						
						$scope.apiKey = apiKey;
						$scope.clientId = clientId;
						
						gapi.load('client:auth2', initAuth);
						
						function initAuth() {
							console.log('initAuth');
					        gapi.client.setApiKey(apiKey);
					        gapi.auth2.init({
					            client_id: clientId,
					            scope: scopes
					        });
					        //var signinButton = document.getElementById('google-button');
					        //signinButton.addEventListener("click", auth);
						}
						
						function auth() {
							gapi.auth2.getAuthInstance().signIn().then(function() {
								makeApiCall();
							});
						}
						this.google = function () {
							var instance = gapi.auth2.getAuthInstance();
							instance.signIn().then(function() {
								makeApiCall();
							});
						}
					},

					controller: 'LoginModalController',
					controllerAs: 'LoginModalCtrl',
					},
			},
			data: { requireLogin: false }
		})	
*/
		/*
		.state('register', {
			url: '/register',
			onEnter: ['$state', function($state) { console.log('entering register'); }],
			onExit:  ['$state', function($state) { console.log('leaving register'); }],
			views: {
				"viewRegister": {
					templateUrl: 'partials/register.html',
					controller: function($scope, $rootScope, $state, $timeout, $q) { //, AuthService) {
						$scope.page = "SIGN UP PAGE";
						$scope.regData = {};
						$scope.regData.fullname = "benoit bellefontaine";
						$scope.regData.username = "ben";
						$scope.regData.emailaddress = "ben@gmail.com";
						$scope.regData.password = "ny8gpa40";
						$scope.login = function(regData) {
							console.log('calling authService');
							//var defer = $q.defer();
							$timeout(function() {
								//defer.resolve('data received!');
								
								if(Math.round(Math.random())) {
									defer.resolve('data received!')
								} else {
									defer.reject('oh no an error! try again')
								}
								
							}, 2000);
							console.log('client ' + $scope.regData.username  + ' logged in');
							$state.go('app.dashboard');
							
							var promise = AuthService.login(regData);
							promise.then(function(user) {
								//alert('Success: ' + user.data.role);
								$rootScope.currentUser = user.data.emailAddress;
								$rootScope.role = user.data.role;
								$state.go(user.data.role);
							}, function(reason) {
								alert('Failed: ' + reason);
							});
							
						};
					},
				}
			},
			// templateUrl: 'loginApp/register.html',
			// controller: 'RegisterController',
		  data: {
			requireLogin: false 
		  }
		})
		*/

		/*
		.state('/threejs', {
			url: '/threejs',
			onEnter: ['$state', function($state) { console.log('entering register'); }],
			onExit:  ['$state', function($state) { console.log('leaving register'); }],
			views: {
				"viewRegister": {
					  templateUrl: 'threejsApp/threejs.html',
					  controller: 'ThreejsCtrl',
					  //data: { requireLogin: false }
				}
			},
			// templateUrl: 'loginApp/register.html',
			// controller: 'RegisterController',
		  data: {
			requireLogin: false 
		  }
        })
		.state('skybox', {
			url: '/skybox',
			views: {
				"viewSkybox": {
					  templateUrl: 'threejsApp/skybox.html',
					  controller: 'SkyboxCtrl',
					  //data: { requireLogin: false }
				}
			},
			// templateUrl: 'loginApp/register.html',
			// controller: 'RegisterController',
		  data: {
			requireLogin: false 
		  }
        })
		.state('particle', {
			url: '/particle',
			views: {
				"viewParticle": {
					  templateUrl: 'index.html',
					  controller: 'ParticleCtrl',
					  //data: { requireLogin: false }
				}
			},
			// templateUrl: 'loginApp/register.html',
			// controller: 'RegisterController',
		  data: {
			requireLogin: false 
		  }
        })*/

  })

  .controller('ApplicationController', function ($scope, $rootScope, $state, registerModal, loginModal, AUTH_EVENTS) {
	  
	$scope.currentUser = null;
	$scope.isAuthenticated = AUTH_EVENTS.notAuthenticated;
	
	$scope.logout = function() {
		console.log('MainController.logout: ',$scope.currentUser);
		$scope.currentUser = undefined;
		$rootScope.currentUser = undefined;
		$state.go('home');
	}
	
	$scope.login = function() {
		console.log('user before login: ',$scope.currentUser);
		loginModal()
			.then(function (user) {
				$scope.currentUser = user;
				return $state.go('userProfileDashboard');
			})
			.catch(function () {
				return $state.go('home');
		});
		console.log('user after login: ',$scope.currentUser);
	}
	
	$scope.register = function() {
		registerModal()
			.then(function (user) {
				$scope.currentUser = user;
				return $state.go('userProfileDashboard');
			})
			.catch(function () {
				return $state.go('home');
		});
	}
	
	$scope.userProfileDashboard = function () {
		$state.go('userProfileDashboard');
	};
	
	$scope.dashGridlist = function () {
		$state.go('dashgridlist');
	};
	
	$scope.gameDashboard = function () {
		$state.go('gameDashboard');
	};
	
	$scope.gameView = function () {
		$state.go('gameView');
	};

	
	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	};
	
  })

  // AUTHENTICATION - AUTH_EVENTS
  .constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
  })

  // AUTHENTICATION - AuthService
  .factory('AuthService', function ($http) { //, Session) {
	var authService = {};
	authService.isAuthenticated = function () {
		//return !!Session.userId;
		return true; // assume authentication is always true !
	};
	return authService;
  })
  
  // AUTHENTICATION - session singleton
  .service('session', ['$log', 'localStorage', function ($log, localStorage) {

	// Instantiate data when service
	// is loaded
	this._user = JSON.parse(localStorage.getItem('session.user'));
	this._accessToken = JSON.parse(localStorage.getItem('session.accessToken'));

	this.getUser = function(){
	  return this._user;
	};

	this.setUser = function(user){
	  this._user = user;
	  localStorage.setItem('session.user', JSON.stringify(user));
	  return this;
	};

	this.getAccessToken = function(){
	  return this._accessToken;
	};

	this.setAccessToken = function(token){
	  this._accessToken = token;
	  localStorage.setItem('session.accessToken', token);
	  return this;
	};

	/**
	 * Destroy session
	 */
	this.destroy = function destroy(){
	  this.setUser(null);
	  this.setAccessToken(null);
	};
	  
  }])
  
  // AUTHENTICATION - auth
  .service('auth', ['$http', 'session', function AuthService($http, session) {

    /**
    * Check whether the user is logged in
    * @returns boolean
    */
    this.isLoggedIn = function isLoggedIn(){
      return session.getUser() !== null;
    };

    /**
    * Log in
    *
    * @param credentials
    * @returns {*|Promise}
    */
    this.login = function(credentials){
      return $http
        .post('/api/login', credentials)
        .then(function(response){
          var data = response.data;
          session.setUser(data.user);
          session.setAccessToken(data.accessToken);
        });
    };

    /**
    * Log out
    *
    * @returns {*|Promise}
    */
    this.logout = function(){
      return $http
        .get('/api/logout')
        .then(function(response){

          // Destroy session in the browser
          session.destroy();      
        });
    };

  }])

  .factory('localStorage', ['$window', function localStorageServiceFactory($window){
    if($window.localStorage){
      return $window.localStorage;
    }
    throw new Error('Local storage support is needed');
  }])

  // login service
  .service('loginModal', function ($uibModal, $rootScope) {

	function assignCurrentUser (user) {
		$rootScope.currentUser = user;
		return user;
	}
	return function() {
		
		var instance = $uibModal.open({
			templateUrl: 'partials/loginModal.html',
			controller: 'LoginModalController',
			controllerAs: 'LoginModalCtrl',
			size: 'lg',
		})
		
		return instance.result.then(assignCurrentUser);
	};
	
  })
  
  // login controller
  .controller('LoginModalController', function ($scope, $state) {
	  
	$scope.page = "login";
	$scope.email = "test@example.com";
	$scope.password = "ueueueu";

	console.log('Loading GOOGLE API AUTHORIZED ACCESS from LoginModalController');
	
	var apiKey = 'AIzaSyCS6E__FsG206GJUh6wWgP6oz0QVCWBpCU';
	var clientId = '898129103079-df2a6vsnvtfvsv3l41vdjkipvvd60aoo.apps.googleusercontent.com';
	var scopes = 'profile';
	
	$scope.apiKey = apiKey;
	$scope.clientId = clientId;
	
	gapi.load('client:auth2', initAuth);
	
	function initAuth() {
		console.log('Init Google Auth');
        gapi.client.setApiKey(apiKey);
        gapi.auth2.init({
            client_id: clientId,
            scope: scopes
        });
        //var signinButton = document.getElementById('google-button');
        //signinButton.addEventListener("click", auth);
	}
	
	function auth() {
		gapi.auth2.getAuthInstance().signIn().then(function() {
			makeApiCall();
		});
	}
	
	this.google = function () {
		console.log('Signin Google Auth');
		var instance = gapi.auth2.getAuthInstance();
		instance.signIn().then(function() {
			makeApiCall();
		});
	}
	
	this.cancel = $scope.$dismiss;
	
	this.submit = function (email, password) {
		$scope.$close(email);
		// to do RESTful API
		//UsersApi.login(email, password).then(function (user) {
		//	$scope.$close(user);
		//
		console.log('client ' + email  + ' logged in');
	};
	
	this.submitModal = function (email, password) {
		$scope.$close(email);
		// to do RESTful API
		//UsersApi.login(email, password).then(function (user) {
		//	$scope.$close(user);
		//
		console.log('client ' + email  + ' logged in');
	};
  })
  
  // register service
  .service('registerModal', function ($uibModal, $rootScope) {
	function assignCurrentUser (user) {
		$rootScope.currentUser = user;
		$rootScope.loggedIn = 1;
		return user;
	}
	return function() {
		var instance = $uibModal.open({
			templateUrl: 'partials/registerModal.html',
			controller: 'RegisterModalCtrl',
			controllerAs: '$ctrl'
		})
		return instance.result.then(assignCurrentUser);
	};
  })
  
  // register controller
  .controller('RegisterModalCtrl', function ($scope) {
	  
	var $ctrl = this;
	$scope.page = "sign up";
	
	$scope.name = "test";
	$scope.email = "test@example.com";
	$scope.password = "eueueueu";
	
	this.cancel = $scope.$dismiss;
	
	this.submit = function (name, email, password) {
		$scope.$close(name);
		// TODO RESTful API  TODO
		//UsersApi.login(email, password).then(function (user) {
		//	$scope.$close(user);
		console.log('client ' + name  + ' created');
	};
  })
  
  .run(function ($rootScope, $state, loginModal, auth, session) { //$uibModal) {
	  
	$rootScope.$on('$stateChangeStart', function (event, next, toParams) {
		
		$rootScope.auth = auth;
		$rootScope.session = session;

		var requireLogin = next.data.requireLogin;
		
		if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
			event.preventDefault();

			loginModal()
				.then(function () {
					console.log('toState.name',next.name);
					return $state.go(next.name, toParams);
				})
				.catch(function () {
					return $state.go('home');
			});
			
		}
		
	});
	
  });