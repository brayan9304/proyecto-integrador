(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('AdvancedSearchController', AdvancedSearchController);

    AdvancedSearchController.$inject = ['$scope', 'Principal', 'AdvancedSearch'];

    function AdvancedSearchController($scope, Principal, AdvancedSearch) {
        var vm = this;
        vm.account = null;
        vm.materials = [];
        vm.params = {
            startDate: null,
            endDate: null,
            SessionKeywords: null,
            materialKeywords: null
        };
        vm.search = search;

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
            });
        }

        function getSearchResults(data) {
            AdvancedSearch.query({data: data}, function (result) {
                vm.materials = result;
            });
        }

        function search() {
            debugger;
            if (vm.params.materialKeywords) {
                vm.params.materialKeywords = vm.params.materialKeywords.replace(/\s,*/, '');
            }
            if (vm.params.sessionKeywords) {
                vm.params.sessionKeywords = vm.params.sessionKeywords.replace(/\s,*/, '');
            }

            vm.searchData = JSON.stringify(vm.params);
            getSearchResults(vm.searchData);
        }
    }
})();

