/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http', 'Snackbar'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http, Snackbar) {
    /**
    * @name Authentication
    * @desc La Factoria a devolver
    */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate

    };

    return Authentication;

    /**
     * @name getAuthenticatedAccount
     * @desc Deuelve la cuenta del usuario registrado
     * @returns {object|undefined} La cuenta si no es `undefined`.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }

      return JSON.parse($cookies.authenticatedAccount);
    }

    /**
     * @name isAuthenticated
     * @desc Comprueba si el usuario actual esta autenticado
     * @returns {boolean} True si el usuario esta autenticado, o false si no.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }

    /**
     * @name setAuthenticatedAccount
     * @desc Fa un Stringify de la cuenta y la guarda en una cookie.
     * @param {Object} user Objecte cuenta a guardar.
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function setAuthenticatedAccount(account) {
      console.log('hola');
      $cookies.authenticatedAccount = JSON.stringify(account);
    }

    /**
     * @name unauthenticate
     * @desc Borra la cookie donde se guarda el usuario.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }
    ////////////////////

    /**
    * @name register
    * @desc Prueba a registrar un nuevo usuario.
    * @param {string} username El username escrito por el usuario.
    * @param {string} password El password escrito por el usuario.
    * @param {string} email El email escrito por el usuari.
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);


      /**
      * @name registerSuccessFn
      * @desc Hace login del nuevo usuario
      */
      function registerSuccessFn(data, status, headers, config){
         console.log('hola1');
        Authentication.login(email, password);
      }


      /**
      * @name registerErrorFn
      * @desc Escribe un log "Error epic!" en la consola
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }

    }

    /**
     * @name login
     * @desc Intenta hacer log in con `email` y `password`
     * @param {string} username El username escrito por el usuario.
     * @param {string} password El password escrito por el usuario.
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function login(email, password) {
       console.log('hola2');

      return $http.post('/api/v1/auth/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Guarda la cuenta en una cookie i redirecciona al index
       */
      function loginSuccessFn(data, status, headers, config) {
        console.log('hola3');
        Authentication.setAuthenticatedAccount(data.data);

        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Escribe un log "Error epic!" a la consola
       */
      function loginErrorFn(data, status, headers, config) {
        Snackbar.error('Usuario o password incorrectos!');
        console.error('Error epic!');
      }
    }

    /**
    * @name logout
    * @desc Intenta hacer un logout del usuario
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unautentica y redirecciona al index con un reload
       */
      function logoutSuccessFn(data, status, headers, config) {
        Authentication.unauthenticate();

        window.location = '/';
      }

      /**
       * @name logoutErrorFn
       * @desc Escribe un log "Error epic!" a la consola
       */
      function logoutErrorFn(data, status, headers, config) {
        console.error('Error epic!');
      }
    }
  }
})();