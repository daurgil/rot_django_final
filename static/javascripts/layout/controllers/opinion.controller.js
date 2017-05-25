/**
* OpinionController
* @namespace thinkster.layout.controllers
*/
(function () {
	'use strict';

	angular
	  .module('thinkster.layout.controllers')
	  .controller('OpinionController', OpinionController);

	OpinionController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

	/**
	* @namespace OpinionController
	*/
	function OpinionController($scope, Authentication, Posts, Snackbar) {
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();
		vm.posts = [];

		activate();

		/**
		* @name activate
		* @desc Acciones a realizar al inicar el controlador
		* @memberOf thinkster.layout.controllers.IndexController
		*/
		function activate() {
			Posts.all().then(postsSuccessFn, postsErrorFn);

			$scope.$on('post.created', function (event, post) {
				vm.posts.unshift(post);
			});

			$scope.$on('post.created.error', function () {
				vm.posts.shift();
			});

			/**
			* @name postSuccessFn
			* @desc Actualiza el array de la vista
			*/
			function postsSuccessFn(data, status, headers, config) {
				vm.posts = data.data;
			}

			/**
			* @name postsErrorFn
			* @desc Muestra un snackbar con error
			*/
			function postsErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}
		}
	}

})();