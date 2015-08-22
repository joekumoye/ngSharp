(function () {

    angular.module('ngSharp').directive('ngDroplet', ['$parse', function ($parse) {

        return {

            restrict: 'A',
            scope: {},
            requires: 'fileModel',
            /*template: '<div ng-class="dropClass" style="{{frameStyle}}"><h5 style="line-height:135%;"><img src="Assets/images/upload-icon.png" class="pull-left" />Drag your payments file here<br /> or <button style="{{containerStyle}}"><input type="file" style="{{fileStyle}}" onchange="angular.element(this).scope().setFiles(this)" /><a class="bold">browse</a></button> for it<br /><small><span ng-show="selectedFile == null">.csv, .xls, .xlsx, .txt accepted</span><span ng-show="selectedFile != null">{{selectedFile.name}}</span> <input type="button" value="UPLOAD" ng-show="selectedFile != null" /></small></h5></div>',
            template: '<div ng-class="dropClass" style="{{frameStyle}}"><h5 style="line-height:135%;"><img src="Assets/images/upload-icon.png" class="pull-left" />{{displayText}}<br /> or <button style="{{containerStyle}}"><input type="file" style="{{fileStyle}}" onchange="angular.element(this).scope().setFiles(this)" /><a style="cursor:pointer;" class="bold btn btn-primary btn-sm">browse</a></button> for it<br /><small><span>{{filePattern}} accepted</span></small></h5></div>',*/
            template: '<div class="droplet" ng-class="{fileHover: hoverWhenEnabled}" ng-disabled="isDisabled"><div><div class="dropletFrameStyle" ng-disabled="isDisabled"><img src="Assets/images/upload-icon.png" class="pull-left dropletIcon" /><span class="dropletText" ng-bind="displayText" ng-disabled="isDisabled"></span><br /><div ng-disabled="isDisabled" class="dropletContainerStyle">or <span class="btn btn-primary btn-sm" ng-disabled="isDisabled">Browse</span> for it <br /><small><span>{{filePattern}} accepted</span></small><input type="file" ng-disabled="isDisabled" class="dropletFileStyle" onchange="angular.element(this).scope().setFiles(this)" onclick="this.value=null" /></div><div></div></div>',

            link: function (scope, elem, attrs) {

                scope.filePattern = (attrs.ngPattern.match(/[.a-z]+/gi)).join(', ') || '*.*';
                //scope.isDisabled = ($parse(attrs.ngDisabled)(scope.$parent)) ? true : undefined;

                scope.$parent.$watch(attrs.ngDisabled, function (value) {
                    ////console.log('isDisabled', value);
                    scope.isDisabled = (value) ? true : undefined;
                });

                var element = elem[0];

                scope.displayText = attrs.ngText;

                var dragEnterLeave = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                };

                element.addEventListener('dragenter', dragEnterLeave, false);

                element.addEventListener('dragleave', dragEnterLeave, false);

                element.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var ok = e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf('Files') >= 0;
                    scope.hoverWhenEnabled = (!scope.isDisabled) && ok;
                    //element.style.backgroundColor = ok ? "#f1f1f1" : "#ffffff";

                }, false);

                element.addEventListener('drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    //element.style.backgroundColor = "#ffffff";

                    var files = e.dataTransfer.files;

                    if (!scope.isDisabled)
                        scope.setFiles(e.dataTransfer);

                }, false);

                scope.setFiles = function (elmt) {
                    console.log('dropped', elmt);
                    if (elmt.files && elmt.files.length && elmt.files.length > 0) {
                        scope.$apply(function () {
                            var pattern = new RegExp(attrs.ngPattern)
                            if (!(pattern.test(elmt.files[0].name))) {
                                alert("File Format not Allowed");
                                scope.selectedFile = null;
                            }
                            else {
                                scope.selectedFile = elmt.files[0];
                                $parse(attrs.fileModel + " = value")(scope.$parent, { value: scope.selectedFile });
                                //perform ng-file-drop event
                                $parse(attrs.ngFileDrop)(scope.$parent);
                            }
                        });
                    }
                };
            }
        };

    }]);

})();