var _Validator = function () {
    var _o;
    var _text;
    var _showing = false;
    var _errorElem;

    var _rules = {
        'digits': function (o) {
            return o.val().match(/^\d*$/);
        },
        'letters': function (o) {
            return o.val().match(/^[a-zа-яA-ZА-Я]*$/);
        },
        'email': function (o) {
            return o.val().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
    };

    var _init = function (o, rule, text, errorElem) {
        if ((typeof(o) !== 'undefined')) {
            _o = o;
            _setText(text);

            if (typeof(errorElem) === 'string') {
                _errorElem = $('#' + errorElem);
            }

            if (typeof(rule) === 'string') {
                _o.on('keyup', function () {
                    if (!_validate(rule)) {
                        _show();
                    } else {
                        _hide();
                    }
                });
            }

            return true;

        } else {

            return false;

        }
    };

    var _show = function () {
        if ((typeof(_o) !== 'undefined') && (!_showing)) {
            _showing = true;
            _o.addClass('v-invalid');

            if (typeof(_errorElem) === 'undefined') {
                var t = $('<span></span>')
                    .html(_text)
                    .addClass('v-error')
                    .insertAfter(_o);
            } else {
                _errorElem.html(_text);
                _errorElem.show();
            }
            return true;
        } else {
            return false;
        }
    };

    var _hide = function () {
        if (_showing) {
            _o.removeClass('v-invalid');
            if (typeof(_errorElem) === 'undefined') {
                _o.siblings('.v-error').remove();
                _o.css('border', '');
                _showing = false;
            } else {
                _errorElem.hide();
            }
        }
    };

    var _validate = function (rule) {
        if (typeof(rule) === 'string') {
            if (typeof(_rules[rule]) === 'function') {
                return _rules[rule](_o);
            } else {
                return true;
            }
        }
    };

    var _setText = function (text) {
        if (typeof(text) === 'string') {
            _text = text;
        } else {
            _text = 'Unknown error';
        }
    };

    var _extend = function (f, name) {
        if ((typeof(f) === 'function') && typeof(name) === 'string') {
            _rules[name] = f;
        }
    };

    return {
        'init': _init,
        'extend': _extend
    };

};

var JSDV = function () {
    var _extensions = {
    };
    var _init = function () {
        var fields = $('input[validate]');

        function _v() {
            var v = new _Validator();
            v.init(
                $(fields[i]), $(fields[i]).attr('validate'),
                $(fields[i]).attr('validate-message' || 'Unknown error'),
                $(fields[i]).attr('validate-error-id' || false)
            );
            for (var e in _extensions) {
                v.extend(_extensions[e], e);
            }
        }

        for (var i = 0; i < fields.length; i++) {
            _v();
        }
    };

    var _extend = function (f, name) {
        if ((typeof(f) === 'function') && typeof(name) === 'string') {
            _extensions[name] = f;
        }
    };

    return {
        'init': _init,
        'extend': _extend
    };
};