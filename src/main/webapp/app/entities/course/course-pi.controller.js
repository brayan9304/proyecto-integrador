(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CoursePiController', CoursePiController);

    CoursePiController.$inject = ['$scope', 'Course','Professor', 'LoginService', 'Principal'];

    function CoursePiController($scope, Course, Professor, LoginService, Principal) {

        var vm = this;

        vm.courses = [];
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.courseProfessor = null;
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        loadProfessor();
        loadAll();

        function loadProfessor() {
            Professor.query(function (result) {
                result.forEach(function (item) {
                    if(item.relatedUserId == vm.account.id){
                        vm.courseProfessor = item;
                    }
                });
                vm.searchQuery = null;
            });
        }

        function loadAll() {
            Course.query(function (result) {
                var coursesAux = [];
                result.forEach(function (item) {
                    if (vm.courseProfessor.email == vm.account.email) {
                        coursesAux.push(item);
                    }
                });
                vm.courses = coursesAux;
                vm.searchQuery = null;
            });
        }
    }
})();
