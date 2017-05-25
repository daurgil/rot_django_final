/**
* Profile
* @namespace thinkster.profiles.services
*/
(function () {
    'use strict';

    angular
      .module('thinkster.profiles.services')
      .factory('Profile', Profile);

    Profile.$inject = ['$http'];

    /**
    * @namespace Profile
    */
    function Profile($http) {
      /**
      * @name Profile
      * @desc La factoria a devolver
      * @memberOf thinkster.profiles.services.Profile
      */
      var Profile = {
        destroy: destroy,
        get: get,
        update: update
      };

      return Profile;

      //////////////////////

      /**
      * @name destroy
      * @desc Elimina el perfil pasado como parametro
      * @param {Object} profile El perfil a eliminar
      * @returns {Promise}
      * @memberOf thinkster.profiles.services.Profile
      */
      function destroy(profile) {

        return $http.delete('/api/v1/accounts/' + profile + '/');
      }

      /**
      * @name get
      * @desc Agafa el perfil de l'usuari passat com a paràmetre
      * @param {string} username El nom del usuario a tornar
      * @returns {Promise}
      * @memberOf thinkster.profiles.services.Profile
      */
      function get(username) {

        return $http.get('/api/v1/accounts/' + username + '/');
      }

      /**
      * @name update
      * @desc Actualiza el perfil pasado como parametro
      * @param {Object} profile El perfil a actualizar
      * @returns {Promise}
      * @memberOf thinkster.profiles.services.Profile
      */
      function update(profile) {
        console.log(profile);
        return $http.put('/api/v1/accounts/' + profile.username + '/', profile);
      }
    }
})();