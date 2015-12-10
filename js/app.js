(function(){
        'use strict';
        var UITest = angular.module('TestMe', ['ngRoute']);

UITest.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'temp.html',
                    controller: 'SelectController'
                }).
                when('/results/:selections', {
                    templateUrl: 'results.html',
                    controller: 'ResultsController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }
    ]);

UITest.controller('SelectController',SelectController);
        SelectController.$inject=['$scope','$filter'];
        function SelectController($scope,$filter) {
        $scope.fields = [//getting checkbox values
            {value: "Abstract"},
            {value: "Inventor"},
            {value: "Language"},
            {value: "Priority"},
            {value: "Publication"},
            {value: "Source"}
        ];
        $scope.submit = function() {
            if( $scope.validate() === false ) return false;//checking for language checkbox
            var selected = "";
            for( var i=0; i<$scope.selectedFields.length; i++ )
            {
                if(selected) selected += "|";//storing the values of whatever is selected
                selected += $scope.selectedFields[i].value;
            }
            window.location.href = "#/results/" + selected;
        };

        $scope.validate = function() {//validates if language checkbox is selected
            $scope.formError = false;
            if( $scope.selectedFields.length === 1 && $scope.selectedFields[0].value === 'Language' )
            {
                $scope.formError = true;//if only language selected- true
                return false;//if only language selected- return false flag so error could be displayed
            }
            return true;
        };

        $scope.selectAll = function() {
            for( var i=0; i<$scope.fields.length; i++ )
            {
                if( $scope.allSelected === true )
                {
                    $scope.fields[i].checked = true;//if all checkbox are selected mark 'select all' checked
                }
                else
                {
                    $scope.fields[i].checked = false;
                }
            }
        };

            $scope.selectedFields = [];
            $scope.$watch('fields', function() {
                    var element = document.getElementById('allSelected');
                    $scope.selectedFields = $filter('filter')($scope.fields,{checked:true},true);
                    element.indeterminate = false;
                    if( $scope.selectedFields.length === $scope.fields.length )
                    {
                        $scope.allSelected = true;//make 'select all' check mark
                    }
                    else
                    {
                        if( $scope.selectedFields.length === 0 )
                        {
                            $scope.allSelected = false;//make 'select all' marked none
                        }
                        else
                        {
                            element.indeterminate = true;//make 'select all' indeterminate
                        }
                    }
                },
                true
            );
        }

UITest.controller('ResultsController',ResultsController)//for results page to display selected checkboxes

        ResultsController.$inject=['$scope','$routeParams'];

        function ResultsController($scope,$routeParams) {
        var selected = $routeParams.selections;
        var list = selected.split('|');
        $scope.selectionList = list;
        }
    }
)();