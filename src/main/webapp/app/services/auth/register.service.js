(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
