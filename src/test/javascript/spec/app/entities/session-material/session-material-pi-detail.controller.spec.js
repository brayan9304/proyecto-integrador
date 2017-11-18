'use strict';

describe('Controller Tests', function() {

    describe('SessionMaterial Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSessionMaterial, MockSession, MockMaterial;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSessionMaterial = jasmine.createSpy('MockSessionMaterial');
            MockSession = jasmine.createSpy('MockSession');
            MockMaterial = jasmine.createSpy('MockMaterial');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'SessionMaterial': MockSessionMaterial,
                'Session': MockSession,
                'Material': MockMaterial
            };
            createController = function() {
                $injector.get('$controller')("SessionMaterialPiDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'proyectoIntegradorApp:sessionMaterialUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
