(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('AdvancedSearchController', AdvancedSearchController);

    AdvancedSearchController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Session', 'CustomSession'];

    function AdvancedSearchController($scope, Principal, LoginService, $state, Session, CustomSession) {
        var vm = this;
        vm.account = null;
        vm.params = {
            startDate: null,
            endDate: null,
            course: null,
            SessionKeywords: null,
            materialKeyword: null
        };
        vm.search = search;

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
            });
        }

        function search() {

        }
    }
})();

