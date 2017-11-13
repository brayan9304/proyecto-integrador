(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CoursePiController', CoursePiController);

    CoursePiController.$inject = ['$scope', 'Course', 'CustomCourse', 'Professor', 'LoginService', 'Principal'];

    function CoursePiController($scope, Course,CustomCourse, Professor, LoginService, Principal) {

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
                loadAll(account.id);
            });
        }

        loadProfessor();

        function loadProfessor() {
            Professor.query(function (result) {
                result.forEach(function (item) {
                    if (item.relatedUserId == vm.account.id) {
                        vm.courseProfessor = item;
                    }
                });
                vm.searchQuery = null;
            });
        }

        function loadAll(id) {
            CustomCourse.query({id: id}, function (result) {
                vm.courses = result;
            });
        }
    }
})();
