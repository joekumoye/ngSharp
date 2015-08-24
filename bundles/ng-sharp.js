///#source 1 1 /sources/core.js
(function () {

    var ngSharp = angular.module('ngSharp', ["ngAnimate", "ui.router"]);

})();
///#source 1 1 /sources/providers/list.js
(function () {

    'use strict';

    angular.module('ngSharp').provider('$list', function () {

        var _list = {
            data: null,
            where: function (criteria) {
                var _data = this.data;
                var result = [];
                if (!criteria || criteria == null || criteria == "" || criteria == []) {
                    result = _data;
                } else {
                    for (var i = 0; i < _data.length; i++) {
                        var match = false;
                        if (angular.isArray(criteria)) {
                            if (criteria.length == 0) {
                                match = true;
                            } else {
                                for (var j = 0; j < criteria.length; j++) {
                                    match = $parse(criteria[j])(_data[i]);
                                    if (match != true) break;
                                }
                            }
                        } else {
                            match = $parse(criteria)(_data[i]);
                        }
                        if (match == true) result.push(_data[i]);
                    }
                }
                return (result.length != 0) ? result : null;
            },
            whereIn: function (property, criteria) {
                var _data = this.data;
                var result = [];
                for (var i = 0; i < _data.length; i++) {
                    var match = false;
                    ////console.log("this-data", _data[i]);
                    var _property = $parse(property)(_data[i]);// _data[i][property];
                    ////console.log('property', _property);
                    /*if (_property != null) {
                        //console.log('propertyindex', _property.indexOf(criteria));
                    }*/
                    if ((_property != null && _property.indexOf(criteria) >= 0) || $parse(criteria)(_property) == true)
                        match = true;

                    if (match == true) result.push(_data[i]);

                }

                return result;

            },
            sum: function (property) {
                var _data = this.data;
                var total = 0;

                if (!property) {
                    for (var i = 0; i < _data.length; i++) {
                        total += _data[i];
                    }
                } else {
                    for (var i = 0; i < _data.length; i++) {
                        total += _data[i][property];
                    }
                }

                return total;

            },
            contains: function () {

            },
            first: function (criteria) {
                var result = !criteria ? this.data : this.where(criteria);
                return result != null ? result[0] : null;
            },
            last: function () {

            },
            select: function (property) {
                if (typeof property == 'string' || property instanceof String) {
                    var _data = this.data;
                    var result = [];

                    for (var i = 0; i < _data.length; i++) {
                        /*var item = {};
                        for (var idx = 0; idx < props.length; idx++) {
                            var key = props[i];
                            //item[key] = _data[i][key];
                            item = _data[i][key];
                        }*/
                        /*for (var prop in props) {
                            //console.log('prop', prop);
                            item[prop] = _data[i][prop]
                        }*/
                        result.push(_data[i][property]);
                    }
                    return result;
                } else {
                    throw "Invalid parameter type in select method. Use string value instead";
                }
            },
            selectMany: function (properties) {
                if (typeof properties == 'string' || properties instanceof String) {
                    var _data = this.data;
                    //console.log('data', _data);
                    var props = properties.split(",");
                    var result = [];

                    for (var i = 0; i < _data.length; i++) {
                        var item = {};

                        for (var prop in props) {
                            //console.log('prop', prop);
                            item[prop] = _data[i][prop]
                        }

                        result.push(_data[i][props[0]]);
                    }
                    return result;
                } else {
                    throw "Invalid parameter type in select method. Use string value instead";
                }
            },
            unique: function (selector) {
                var _data = this.data;
                //console.log('data', _data);
                var n = {}, r = [];
                if (selector) {
                    for (var i = 0; i < this.data.length; i++) {
                        if (!n[this.data[i][selector]]) {
                            n[this.data[i][selector]] = true;
                            r.push(this.data[i]);
                        }
                        //if(r.indexOf(_data[i]) == -1)
                    }
                } else {
                    for (var i = 0; i < this.data.length; i++) {
                        if (!n[this.data[i]]) {
                            n[this.data[i]] = true;
                            r.push(this.data[i]);
                        }
                        //if(r.indexOf(_data[i]) == -1)
                    }
                }
                return r;
            }
        };

        return {

            $get: function () {

                var list = function (entity) {
                    var me = {};
                    for (var prop in _list) {
                        me[prop] = _list[prop];
                    }
                    me.data = entity;
                    return me;
                };

                return list;

            }

        }
    });

})();

///#source 1 1 /sources/providers/mvcProvider.js
(function () {

    angular.module('ngSharp').provider('$mvc', function () {

        return {

            $get: function () {

                return {

                    configure: function (setting) {



                    },

                    settings: {


                    }

                }

            }

        }

    });

})();
///#source 1 1 /sources/providers/string.js
(function () {

    'use strict';

    angular.module('ngSharp').provider('$string', function () {

        return {

            $get: function () {

                return {

                    format: function () {

                        if (!arguments)
                            throw "$string.format() has no overload method that takes no parameter";

                        if (arguments.length <= 1)
                            throw "$string.format() requires at least 2 arguments";

                        var data = arguments[0];
                        var args = [].slice.call(arguments, 1, arguments.length);

                        var result = data.replace(/\{(\d)\}/g, function (value) {
                            return args[parseInt(value.substring(1, value.length - 1))];
                        });

                        return result;
                    }

                }

            }

        }
    });

})();

///#source 1 1 /sources/directives/file-model.js
(function () {

    angular.module('ngSharp').directive('fileModel', ['$parse', function ($parse) {

        return {
            restrict: 'A',

            link: function (scope, element, attrs) {

                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    if (element.files) {
                        scope.$apply(function () {
                            modelSetter(scope, element[0].files[0]);
                        });
                    }
                });

            }
        };
    }]);

})();
///#source 1 1 /sources/directives/ng-alias.js
(function () {

    angular.module('ngSharp').directive('ngAlias', ['$parse', function ($parse) {

        return {

            restrict: 'A',

            link: function (scope, element, attrs) {

                var aliases = attrs.ngAlias.split(',');

                angular.forEach(aliases, function (alias) {

                    var parts = alias.split('=');

                    var _key = parts[0].trim();
                    var _value = parts[1].trim();

                    scope.$watch(_value, function () {
                        $parse(alias)(scope);
                    });

                });
            }
        };

    }]);

})();
///#source 1 1 /sources/directives/ng-disable-if.js
(function () {

    angular.module('ngSharp').directive('ngDisableIf', function () {
        return function (scope, element, attrs) {

            scope.startWatching = function (model) {
                ////console.log('model to watch', model);
                scope.$statusWatch = scope.$watch(model, function (newVal, oldVal) {
                    ////console.log('watchvalue', String(newVal));
                    ////console.log('ngdisableif', String(attrs.ngDisableIf));
                    attrs.$set('disabled', (String(newVal) == String(attrs.ngDisableIf)) ? 'disabled' : undefined);
                }, false);
            }

            scope.stopWatching = function () {
                scope.$statusWatch();
            }

            //we require ng-watch-on
            scope.$watch(attrs.ngWatchOn, function (newVal, oldVal) {
                ////console.log('watcher', newVal);
                if (scope.$statusWatch) {
                    ////console.log('watcher exists');
                    scope.stopWatching();
                }
                ////console.log('value to watch', newVal);
                scope.startWatching(newVal);
            }, false);

        }
    });

})();
///#source 1 1 /sources/directives/ng-droplet.js
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
///#source 1 1 /sources/directives/ng-prefix.js
(function () {

    angular.module('ngSharp').directive('ngPrefix', [function () {

        return {

            restrict: 'A',
            require: 'ngModel',

            link: function (scope, element, attrs, controller) {

                var expr = attrs.ngPrefix;

                function ensurePrefix(value) {
                    // Need to add prefix if we don't have +234 prefix already AND we don't have part of it
                    if (value) {
                        value = value.replace(/^0+/, '');
                        ////console.log('index', value.indexOf(attrs.ngPrefix));
                        if (value && value.indexOf(attrs.ngPrefix) != 0) {
                            controller.$setViewValue(attrs.ngPrefix + value);
                            controller.$render();
                            return attrs.ngPrefix + value;
                        }
                        else {
                            return value;
                        }
                    }

                }

                controller.$formatters.push(ensurePrefix);
                controller.$parsers.push(ensurePrefix);

            }
        };
    }]);

})();
///#source 1 1 /sources/directives/ng-unique-in.js
(function () {

    angular.module('ngSharp').directive('ngUniqueIn', ['$parse', '$list', '$string', function ($parse, $list, $string) {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                //var blacklist = attr.blacklist.split(',');
                var parent = $parse(attrs.ngUniqueIn)(scope);

                var startPos = attrs.ngModel.indexOf('.');
                var key = attrs.ngModel.substring(startPos + 1, attrs.ngModel.length);

                var blacklist = $list(parent).select(key);

                //For DOM -> model validation
                ctrl.$parsers.unshift(function (value) {
                    //var valid = blacklist.indexOf(value) === -1;
                    var match = $list(parent).where($string.format("{0} == '{1}'", key, value));
                    var isvalid = (match == null) || (match != null && match.length < 1);
                    ctrl.$setValidity('$isUnique', isvalid);
                    return isvalid ? value : undefined;
                });

                //For model -> DOM validation
                ctrl.$formatters.unshift(function (value) {
                    var match = $list(parent).where($string.format("{0} == '{1}'", key, value));
                    var isvalid = (match == null) || (match != null && match.length <= 1);
                    ctrl.$setValidity('$isUnique', isvalid);
                    return value;
                });

            }
        };
    }]);

})();
///#source 1 1 /sources/controllers/mvcController.js
(function () {

    angular.module('ngSharp').controller('$mvcController', ['$rootScope', '$scope', '$parse', '$state', function ($rootScope, $scope, $parse, $state) {

        $scope.$parent.resolve = function (data) {
            return $parse(data)($scope);
        }

        $scope.currentState = $state.current.name;

        $scope.submitAction = $state.current.name.replace("app.", "") + ".post(params)";

        $scope.submit = function (params) {
            $rootScope.$broadcast('$activity', { event: 'submit', params: params });
            $parse($scope.submitAction)($scope, { params: params });
        }

        $scope.do = function (action, params) {
            $rootScope.$broadcast('$activity', { event: action, params: params });
        }

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            var stateName = toState.name;

            var action = stateName.replace("app.", "");
            var _get = action + ".get(params)";

            $parse(_get)($scope, { params: toParams });

        });

    }]);

})();
