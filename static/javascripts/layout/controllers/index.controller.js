/**
* IndexController
* @namespace thinkster.layout.controllers
*/
(function () {
	'use strict';

	angular
	  .module('thinkster.layout.controllers')
	  .controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

	/**
	* @namespace IndexController
	*/
	function IndexController($scope, Authentication, Posts, Snackbar) {
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();

		activate();

		/**
		* @name activate
		* @desc Acciones a realizar al inicar el controlador
		* @memberOf thinkster.layout.controllers.IndexController
		*/
		function activate() {
		    /**COmentado para no utilizar el apartado de post, posile cambio para opiniones**/
			/*Posts.all().then(postsSuccessFn, postsErrorFn);

			$scope.$on('post.created', function (event, post) {
				vm.posts.unshift(post);
			});

			$scope.$on('post.created.error', function () {
				vm.posts.shift();
			});*/

			/**
			* @name postSuccessFn
			* @desc Actualiza el array de la vista
			*/
			/*function postsSuccessFn(data, status, headers, config) {
				vm.posts = data.data;
			}*/

			/**
			* @name postsErrorFn
			* @desc Muestra un snackbar con error
			*/
			/*function postsErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}*/
		}
	}

})();