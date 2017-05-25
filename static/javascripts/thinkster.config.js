(function () {
    'use strict';

    angular
      .module('thinkster.config')
      .config(config);

    config.$inject = ['$locationProvider'];

    /**
    * @name config
    * @desc Habilita el routing con HTML5
    */
    function config($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
    }
})();