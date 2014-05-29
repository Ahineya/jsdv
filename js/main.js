
var v = new JSDV();

v.extend({
    f: function(o) {
        var depElem = document.getElementById(o.getAttribute("validate-depends"));
        if (depElem.value === "secret") {
            return o.value.match(/^\d*$/); //Digits only
        } else {
            return /^[a-zа-яё]+$/i.test(o.value); //Letters only
        }
    },
    name: "depends-test"
});

v.init();

document.getElementById('check').onclick = function(){
    alert(v.isValid() ? 'Valid' : 'Invalid' );
};