var app = angular.module("todoApp", ['ui.bootstrap','pascalprecht.translate']);
app.config(function ($translateProvider, $translatePartialLoaderProvider) {
  $translateProvider.useLoader('$translatePartialLoader', {
  urlTemplate: '/i18n/{part}/{lang}.json'
});
}); 

app.factory("myFactory",function(){
    var data=[{
                    "task_id": 100,
                    "Task_name": "Task1"
                }, {
                    "task_id": 101,
                    "Task_name": "Task2"
                }, {
                    "task_id": 102,
                    "Task_name": "Task3"
                }, {
                    "task_id": 103,
                    "Task_name": "Task4"
                }, {
                    "task_id": 104,
                    "Task_name": "Task5"
                }];
    var eachdata={};
     eachdata.setdata=function(id,name){
        tid=id;
        tname=name;
        data.push({"task_id": tid,
                    "Task_name": tname})
    }
     eachdata.getdata=function(){
        return data;
    }
    return eachdata;
})

        app.controller("todoController",['$scope',"$rootScope",'$uibModal','myFactory','$translatePartialLoader','$translate' ,function($scope,$rootScope,$uibModal,myFactory,$translatePartialLoader,$translate) {
              $translatePartialLoader.addPart('home');
                   $translate.refresh(); 
                   $translate.use('en');
            $scope.task=myFactory.getdata();
            $scope.langval="en";
            $scope.lan=function(lan){
               
                $translate.use(lan);
                $rootScope.language=lan;
                

            }
            $scope.open = function (titlename) {
                    var modalInstance = $uibModal.open({
                    templateUrl: 'Popup.html',
                    controller: 'PopupCont',
                    });
                    }
            $scope.hide = true;
            $scope.add_hide = false;
            $scope.task = myFactory.getdata();
            $scope.removetask = function(eachtask) {
                for (i = 0; i < $scope.task.length; i++) {
                    if ($scope.task[i].task_id == eachtask.task_id) {
                        $scope.task.splice(i, 1);
                    }
                }

            }
            

        }]);
        app.controller('PopupCont',function ($scope,$uibModalInstance, myFactory,$translatePartialLoader,$translate,$rootScope) {
             
             $translatePartialLoader.addPart('Popup');
                   $translate.refresh(); 
                   $translate.use($rootScope.language);
            $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            };
            $scope.addtask = function() {
                $scope.task=myFactory.getdata();
                var count = 0;
                if ($scope.tid != undefined && $scope.tname != undefined) {
                    for (i = 0; i < $scope.task.length; i++) {
                        if ($scope.task[i].task_id != $scope.tid && $scope.task[i].Task_name != $scope.tname) {
                            count++;
                        }
                    }
                    if (count == $scope.task.length) {
                        myFactory.setdata($scope.tid,$scope.tname);
                         $scope.tid = "";
                        $scope.tname = "";
                    } else {
                        alert("Already exists");
                        $scope.tid = "";
                        $scope.tname = "";
                    }
                } else {
                    alert("Please Enter Task id and Task name")
                }
            }
           
        });