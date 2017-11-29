(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('AdvancedSearchController', AdvancedSearchController);

    AdvancedSearchController.$inject = ['$scope', 'Principal', 'AdvancedSearch', 'DataUtils'];

    function AdvancedSearchController($scope, Principal, AdvancedSearch, DataUtils) {
        var vm = this;
        vm.account = null;
        vm.materials = [];
        vm.params = {
            startDate: null,
            endDate: null,
            SessionKeywords: null,
            materialKeywords: null
        };
        vm.startDate = null;
        vm.endDate = null;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
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
            if (vm.startDate) {
                vm.params.startDate = vm.startDate.toDateString();
            }
            if (vm.endDate) {
                vm.params.endDate = vm.endDate.toDateString();
            }

            vm.searchData = JSON.stringify(vm.params);
            getSearchResults(vm.searchData);
        }
    }
})();

