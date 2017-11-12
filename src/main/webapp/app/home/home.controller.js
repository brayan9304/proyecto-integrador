(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        initCalendar();
        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }

        function initCalendar() {
            var settings = {
                Color: '',
                LinkColor: '',
                NavShow: true,
                NavVertical: false,
                NavLocation: '',
                DateTimeShow: true,
                DateTimeFormat: 'mmm, yyyy',
                DatetimeLocation: '',
                EventClick: '',
                EventTargetWholeDay: false
            };
            var events = [
                {'Date': new Date(2017, 10, 13), 'Title 1': 'Doctor appointment at 3:25pm.'},
                {'Date': new Date(2017, 10, 14), 'Title 2': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
                {'Date': new Date(2017, 10, 15), 'Title 3': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
            ];

            var element = document.getElementById('caleandar');
            caleandar(element, events, settings);

        }
    }
})();
