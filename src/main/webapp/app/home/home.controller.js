(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Session', 'CustomSession'];

    function HomeController($scope, Principal, LoginService, $state, Session, CustomSession) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.sessions = [];
        vm.events = [];

        $(document).ready(function(){
            $(".owl-carousel").owlCarousel(
                {
                    items: 1,
                    autoplay: true,
                    center: true,
                    loop: true
                });
        });

        vm.register = register;
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

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

        function printCalendar(events) {
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

            var calendarParent = document.getElementById('calendar');

            var element = calendarParent.children;
            if (element.length > 0) {
                calendarParent.removeChild(element[0]);
            }
            caleandar(calendarParent, events, settings);
        }

        function initCalendar(isLogged) {
            var events = [];
            if (isLogged) {
                CustomSession.query({id: vm.account.id}, function (result) {
                    vm.sessions = result;
                    for (var i = 0; i < result.length; i++) {
                        events.push({
                            'Date': new Date(result[i].date.split('-')[0], Number(result[i].date.split('-')[1]) - 1, result[i].date.split('-')[2].substr(0, 2)),
                            'Title': result[i].name
                        });
                    }
                    printCalendar(events);
                });
            } else {
                printCalendar(events);
            }

        }
    }
})();
