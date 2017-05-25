/**
* ProfileSettingsController
* @namespace thinkster.profile.controllers
*/
(function () {
    'use strict';

    angular
      .module('thinkster.profiles.controllers')
      .controller('ProfileSettingsController', ProfileSettingsController);

      ProfileSettingsController.$inject = [ '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'];

      /**
      * @namespace ProfileSettingsController
      */
      function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();

        /**
        * @name activate
        * @desc Acciones a realizar al inicar el controlador
        * @memberOf thinkster.controllers.ProfileSettingsController
        */
        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var username = $routeParams.username.substr(1);

            if (!authenticatedAccount) {
                $location.url('/');
                Snackbar.error('No estas autorizado para a visualizar esta pagina.');
            } else {
                if (authenticatedAccount.username !== username) {
                    $location.url('/');
                    Snackbar.error('No estas autorizado para a visualizar esta pagina.');
                }
            }

            Profile.get(username).then(profileSuccessFn, profileErrorFn);

            /**
            * @name profileSuccessFn
            * @desc Actualiza el 'profile' para vista
            */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }

            /**
            * @name profileErrorFn
            * @desc Redirige al index
            */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
                console.log('Error profileErrorFn');
                Snackbar.error('Ese usuario no existe.');
            }
        }

        /**
        * @name destroy
        * @desc Elimina el perfil de un usuario
        * @memberOf thinkster.profiles.controllers.ProfileSettingsController
        */
        function destroy() {
            console.log(vm.profile.username);
            Profile.destroy(vm.profile.username).then(profileSuccessFn, profileErrorFn);

            /**
            * @name profileSuccessFn
            * @desc Redirige al index y muestra un Snackbar
            */
            function profileSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();
                window.location = '/';

                Snackbar.show('Tu cuenta ha sido eliminada.');
            }

            /**
            * @name profileErrorFn
            * @desc Muestra un Snackbar de error
            */
            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }

        /**
        * @name update
        * @desc Actualiza el perfil del usuario
        * @memberOf thinkster.profiles.controllers.ProfileSettingsController
        */
        function update() {
            Profile.update(vm.profile).then(profileSuccessFn, profileErrorFn);


            /**
            * @name profileSuccessFn
            * @desc Muestra un Snackbar de que ha funcionado
            */
            function profileSuccessFn(data, status, headers, config) {
                Snackbar.show('Tu perfil ha sido actualizado.');
            }

            /**
            * @name profileErrorFn
            * @desc Muestra un Snackbar de error
            */
            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
      }
})();