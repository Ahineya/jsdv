var _Validator = function () {
    var _o;
    var _text;
    var _showing = false;
    var _errorElem;

    var _rules = {
        'digits': function (o) {
            return o.value.match(/^\d*$/);
        },
        'letters': function (o) {
            return o.value.match(/^[a-zа-яA-ZА-Я]*$/);
        },
        'email': function (o) {
            return o.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
    };

    var _init = function (o, rule, text, errorElem) {
        if ((typeof(o) !== 'undefined')) {
            _o = o;
            _setText(text);

            if (typeof(errorElem) === 'string') {
                _errorElem = document.getElementById(errorElem);
            }

            if (typeof(rule) === 'string') {
                _o.onkeyup = function () {
                    if (!_validate(rule)) {
                        _show();
                    } else {
                        _hide();
                    }
                };
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

            var vmessage = fields[i].hasAttribute('validate-message') ? fields[i].getAttribute('validate-message') : 'Unknown error';
            var verrorid = fields[i].hasAttribute('validate-error-id') ? fields[i].getAttribute('validate-error-id') : false;

            v.init(
                fields[i],
                fields[i].getAttribute('validate'),
                vmessage,
                verrorid
            );
            for (var e in _extensions) {
                v.extend(_extensions[e], e);
            }
        }

        for (i = 0; i < fields.length; i++) {
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