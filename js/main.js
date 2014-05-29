
var v = new JSDV();

v.extend({
    f: function(o) {
        var length = o.getAttribute('validate-length-min');
        return (o.value.length >= length);
    },
    name: 'length-min'
});

v.extend({
    f: function(o) {
        var length = o.getAttribute('validate-length-max');
        return (o.value.length <= length);
    },
    name: 'length-max'
});

v.extend({
    f: function(o) {
        var wth = o.getAttribute('validate-with');
        var elemWith = document.getElementById(wth);
        return (o.value === elemWith.value);
    },
    name: "same"
});

v.init();

document.getElementById('check').onclick = function(){
    alert(v.isValid() ? 'Valid' : 'Invalid' );
};

