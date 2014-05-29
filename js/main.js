
var v = new JSDV();

v.init();

document.getElementById('check').onclick = function(){
    alert(v.isValid() ? 'Valid' : 'Invalid' );
};