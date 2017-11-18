'use strict';

describe('Controller Tests', function() {

    describe('Session Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSession, MockCourse, MockSessionMaterial;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSession = jasmine.createSpy('MockSession');
            MockCourse = jasmine.createSpy('MockCourse');
            MockSessionMaterial = jasmine.createSpy('MockSessionMaterial');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Session': MockSession,
                'Course': MockCourse,
                'SessionMaterial': MockSessionMaterial
            };
            createController = function() {
                $injector.get('$controller')("SessionPiDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'proyectoIntegradorApp:sessionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
