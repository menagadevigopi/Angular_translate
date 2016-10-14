describe('PopupCont', function() {
    var $controller;
  beforeEach(module('todoApp'));
  var modalInstance;

          modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };   
  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  describe('addtask', function() {
    it('check whether the new item is added to tha array', function() {
      var $scope = {};
       
      var controller = $controller('PopupCont', { $scope: $scope,$uibModalInstance:modalInstance  });
      $scope.tid="111";
      $scope.tname="abc";
      $scope.addtask();
      expect($scope.task[5]).toEqual(jasmine.objectContaining(Object({task_id: '111',Task_name:"abc"}))); 
    });

  });
   describe('removetask', function() {
    it('check whether the item is removed from tha array', function() {
      var $scope = {};
         var eachtask={};
      var controller = $controller('todoController', { $scope: $scope});
      eachtask.task_id="100";
      $scope.removetask(eachtask);
      expect($scope.task[0]).not.toEqual(jasmine.objectContaining(Object({task_id: 100,Task_name:"Task1"}))); 
    });

  });
});

