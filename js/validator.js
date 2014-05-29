var _Validator = function () {
    var _o;
    var _text;
    var _showing = false;
    var _errorElem;
    var _valid = true;

    var _rules = {
        'required': function(o) {
            return o.value !== "";
        },
        'digits': function(o) {
            return o.value.match(/^\d*$/) || o.value === "";
        },
        'letters': function(o) {
            return /^[a-zа-яё]+$/i.test(o.value) || o.value === "";
        },
        'email': function(o) {
            return o.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || o.value === "";
        },
        'url': function(o) {
            return o.value.match(/^((ht|f)tps?:\/\/)?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/i) || o.value === "";
        }
    };

    var _init = function (o, rule, text, errorElem, validateOn) {
        if ((typeof(o) !== 'undefined')) {
            _o = o;
            _setText(text);

            if (typeof(errorElem) === 'string') {
                _errorElem = document.getElementById(errorElem);
            }

            if (typeof(rule) === 'string') {
                if (!validateOn) {
                    _o.onkeyup = function () {
                        if (!_validate(rule)) {
                            _show();
                        } else {
                            _hide();
                        }
                    };

                    if (!_validate(rule)) {
                        _show();
                    } else {
                        _hide();
                    }

                } else {
                    var events = validateOn.split(",");
                    for (var i =0; i<events.length; i++) {
                        events[i] = events[i].replace(/^\s+|\s+$/g, '');

                        var eventsArr = events[i].split(" ");

                        var elem = document.getElementById(eventsArr[0]);
                        var action = eventsArr[1];
                        elem["on" + action] = function () {
                            if (!_validate(rule)) {
                                _show();
                            } else {
                                _hide();
                            }
                        };

                        if (!_validate(rule)) {
                            _show();
                        } else {
                            _hide();
                        }

                    }
                }

            }

            return true;

        } else {

            return false;

        }
    };

    var _show = function () {
        if ((typeof(_o) !== 'undefined') && (!_showing)) {
            _showing = true;
            _o.className += 'v-invalid';

            if (typeof(_errorElem) === 'undefined') {
                var t = document.createElement('span');
                t.innerHTML = _text;
                t.className = 'v-error';
                _o.parentNode.insertBefore(t, _o.nextSibling);
            } else {
                _errorElem.innerHTML = _text;
                _errorElem.style.display = 'block';
            }
            return true;
        } else {
            return false;
        }
    };

    var _hide = function () {
        if (_showing) {
            className = (" " + _o.className + " ").replace("v-invalid", " ");
            _o.className = className;

            if (typeof(_errorElem) === 'undefined') {
                var siblings = _o.parentNode.children,
                    sibWithId = null;
                for(var i = siblings.length; i--;) {
                    if(siblings[i].className === 'v-error') {
                        sibWithId = siblings[i];
                        break;
                    }
                }

                if(sibWithId) {
                    sibWithId.parentNode.removeChild(sibWithId);
                }

                _o.style.border = "";


            } else {
                _errorElem.style.display = 'none';
            }

            _showing = false;

        }
    };

    var _validate = function (rule) {
        if (typeof(rule) === 'string') {
            rule = rule.replace(/^\s+|\s+$/g, '');
            var rules = rule.split(" ");
            var valid = true;
            for (var i = 0; i<rules.length; i++) {
                if (typeof(_rules[rules[i]]) === 'function') {
                    //_valid = _rules[rule[i]](_o);
                    //return _rules[rule[i]](_o);
                    if (!_rules[rules[i]](_o)) {
                        valid = false;
                    }
                }
            }
            _valid = valid;
            return valid;

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

    var _isValid = function() {
        return _valid;
    }

    return {
        'init': _init,
        'extend': _extend,
        'isValid': _isValid
    };

};

window['JSDV'] = function () {
    var _extensions = {
    };
    var _validators = [];
    var _init = function () {

        var fields = [];
        var allElements = document.getElementsByTagName('input');
        var i, n;
        for (i = 0, n = allElements.length; i < n; i++)
        {
            if (allElements[i].getAttribute('validate'))
            {
                fields.push(allElements[i]);
            }
        }
        allElements = document.getElementsByTagName('textarea');
        for (i = 0, n = allElements.length; i < n; i++)
        {
            if (allElements[i].getAttribute('validate'))
            {
                fields.push(allElements[i]);
            }
        }

        function _v() {
            var v = new _Validator();
            _validators.push(v);

            var vmessage = fields[i].hasAttribute('validate-message') ? fields[i].getAttribute('validate-message') : 'Unknown error';
            var verrorid = fields[i].hasAttribute('validate-error-id') ? fields[i].getAttribute('validate-error-id') : false;
            var validateOn = fields[i].hasAttribute('validate-on') ? fields[i].getAttribute('validate-on') : false;

            v.init(
                fields[i],
                fields[i].getAttribute('validate'),
                vmessage,
                verrorid,
                validateOn
            );
            for (var e in _extensions) {
                v.extend(_extensions[e], e);
            }
        }

        for (i = 0; i < fields.length; i++) {
            _v();
        }
    };

    var _extend = function(opts) {
        if (opts && typeof(opts) === "object") {
            if (opts.f && typeof(opts.f) === "function" && opts.name && typeof(opts.name) === "string") {
                _extensions[opts.name] = opts.f;
            }
        }
    }

    var _isValid = function() {
        var valid = true;
        for (var i = 0; i<_validators.length; i++) {
            if (!_validators[i].isValid()) {
                valid = false;
            }
        }
        return valid;
    }

    _extend({
        f: function(o) {
            var length = o.getAttribute('validate-length-min');
            return (o.value.length >= length || o.value === "");
        },
        name: 'length-min'
    });

    _extend({
        f: function(o) {
            var length = o.getAttribute('validate-length-max');
            return (o.value.length <= length || o.value === "");
        },
        name: 'length-max'
    });

    _extend({
        f: function(o) {
            var wth = o.getAttribute('validate-with');
            var elemWith = document.getElementById(wth);
            return (o.value === elemWith.value || o.value === "");
        },
        name: "same"
    });

    return {
        'init': _init,
        'extend': _extend,
        'isValid': _isValid
    };
};