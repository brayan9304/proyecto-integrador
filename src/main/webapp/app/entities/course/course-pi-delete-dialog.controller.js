(function () {
    'use strict';

    angular
        .module('proyectoIntegradorApp')
        .controller('CoursePiDeleteController', CoursePiDeleteController);

    CoursePiDeleteController.$inject = ['$uibModalInstance', 'entity', 'Course'];

    function CoursePiDeleteController($uibModalInstance, entity, Course) {
        var vm = this;
        vm.course = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete(id) {
            Course.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                }, function () {
                    var modalElement = document.getElementsByClassName("modal-body")[0];
                    var element = document.createElement("div");
                    element.innerHTML = "<h5 style='background-color: #ebccd1; color: #a94442; padding: 10px'>check for data consistency before removing this item, some other entites may be using it's reference</h5> ";
                    modalElement.appendChild(element);
                });
        }
    }
})();
