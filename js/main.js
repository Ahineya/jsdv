
var v = new JSDV();

v.extend({
    f: function(o, _v) {
        var depElem = document.getElementById(o.getAttribute("validate-depends"));
        if (depElem.value === "secret") {
            return _v("digits"); //Digits only
        } else {
            return _v("letters"); //Letters only
        }
    },
    name: "depends-test"
});

v.init();

document.getElementById('check').onclick = function(){
    alert(v.isValid() ? 'Valid' : 'Invalid' );
};