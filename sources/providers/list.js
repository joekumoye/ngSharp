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
