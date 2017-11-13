(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Session'];

    function HomeController($scope, Principal, LoginService, $state, Session) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.sessions = [];


        vm.register = register;
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        loadAllSessions();
        getAccount();


        function loadAllSessions() {
            Session.query(function (result) {

                vm.sessions = result;
                vm.searchQuery = null;
            });
        }

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                if (vm.isAuthenticated()) {
                    initCalendar(true);
                } else {
                    initCalendar(false);
                }
            });
        }

        function register() {
            $state.go('register');
        }

        function loadUserEvents() {
            var events = [
                {'Date': new Date(2017, 10, 13), 'Title 1': 'Doctor appointment at 3:25pm.'},
                {
                    'Date': new Date(2017, 10, 14),
                    'Title 2': 'New Garfield movie comes out!',
                    'Link': 'https://garfield.com'
                },
                {
                    'Date': new Date(2017, 10, 15),
                    'Title 3': '25 year anniversary',
                    'Link': 'https://www.google.com.au/#q=anniversary+gifts'
                }
            ];
            return events;
        }

        function initCalendar(isLogged) {
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
            var events = [];
            if (isLogged) {
                events = loadUserEvents();
            }

            var calendarParent = document.getElementById('calendar');

            var element = calendarParent.children;
            if (element.length > 0) {
                calendarParent.removeChild(element[0]);
            }

            caleandar(calendarParent, events, settings);
        }
    }
})();
