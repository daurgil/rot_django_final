/**
* ProfileController
* @namespace thinkster.profiles.controllers
*/
(function () {
    'use strict';

    angular
      .module('thinkster.profiles.controllers')
      .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];

    /**
    * @namespace ProfileController
    */
    function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();

        /**
        * @name activate
        * @desc Acciones a realizar al inicar el controlador
        * @memberOf thinkster.profiles.controllers.ProfileController
        */
        function activate() {
            var username = $routeParams.username.substr(1);

            Profile.get(username).then(profileSuccessFn, profileErrorFn);
            Posts.get(username).then(postsSuccessFn, postsErrorFn);

            /**
            * @name profileSuccessFn
            * @dessc Actualita el 'profile' en el viewmodel
            */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            /**
            * @name profileErrorFn
            * @desc Redirige al index y muestra un Snackbar de error
            */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                console.log('profileErrorFn a profile.controller.js');
                Snackbar.error('Eixe usuari no existeix.');
            }

            /**
            * @name postSuccessFn
            * @desc Actualita 'posts' en el viewmodel
            */
            function postsSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }

            /**
            * @name postsErrorFn
            * @desc Muestra un Snackbar de error
            */
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }
    }
})();