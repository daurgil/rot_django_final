/**
* Snackbar
* @namespace thinkster.utils.services
*/
(function ($, _) {
	'use strict';

	angular
	  .module('thinkster.utils.services')
	  .factory('Snackbar', Snackbar);

	/**
	* @namespace Snackbar
	*/
	function Snackbar() {
		/**
		* @name Snackbar
		* @desc La factoria a devolver
		*/
		var Snackbar = {
			error: error,
			show: show
		};

		return Snackbar;

		/////////////////////

		/**
		* @name _snackbar
		* @desc Muestra un snackbar
		* @param {string} content El contenido del snackbar
		* @param {Object} options Opciones para mostrar el snackbar
		*/
		function _snackbar(content, options) {
			options = _.extend({ timeout: 3000 }, options);
			options.content = content;

			$.snackbar(options);
		}

		/**
		* @name error
		* @desc Muestra un snackbar de error
		* @param {string} content El Contenido del snackbar
		* @param {Object} options Opciones para mostrar el snackbar
		* @memberOf thinkster.utils.services.Snackbar
		*/
		function error(content, options) {
			_snackbar('Error ' + content, options);
		}

		/**
		* @name show
		* @desc Muestra un snackbar standard
		* @param {string} content El contenido del snackbar
		* @param {Object} options Opciones para mostrar el snackbar
		* @memberOf thinkster.utils.services.Snackbar
		*/
		function show(content, options) {
			_snackbar(content, options);
		}
	}
})($, _);