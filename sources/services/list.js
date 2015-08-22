(function () {

    angular.module('ngSharp').service('$list', ['$filter', '$parse', function ($filter, $parse) {

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
            select: function (properties) {
                if (typeof myVar == 'string' || myVar instanceof String) {
                    var _data = this.data;
                    var props = properties.split(",");
                    var result = [];

                    for (var i = 0; i < _data.length; i++) {
                        var item = {};
                        for (var prop in props) {
                            item[prop] = _data[i][prop]
                        }
                        result.push(item);
                    }
                    return result;
                } else {
                    throw "Invalid parameter type in select method. Use string value instead";
                }
            }
        };

        var list = function (entity) {
            var me = {};
            for (var prop in _list) {
                me[prop] = _list[prop];
            }
            me.data = entity;
            return me;
        };

        return list;

    }]);

})();

