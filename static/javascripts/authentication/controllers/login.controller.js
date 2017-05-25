/**
* LoginController
* @namespace thinkster.authentication.controllers
*/
(function () {
	'use strict';

	angular
		.module('thinkster.authentication.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Authentication'];

	/**
	* @namespace LoginController
	*/
	function LoginController($location, $scope, Authentication) {
		var vm = this;

		vm.login = login;

		activate();

		/**
		* @name activate
		* @desc Acciones a realizar al inicar el controlador
		* @memberOf thinkster.authentication.controllers.Logincontroller
		*/
		function activate() {
			if (Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}

		/**
		* @name Login
		* @dec Log in del usuario
		* @memberOf thinkster.authentication.controllers.LoginController
		*/
		function login() {
			Authentication.login(vm.email, vm.password);
		}
	}
})();