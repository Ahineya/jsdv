var v = new JSDV();

v.extend(function(o) {
  return o.value.match(/^((ht|f)tps?:\/\/)?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/i);
},'url');

v.extend(function(o) {
    var length = o.getAttribute('validator-length-min');
    return (o.value.length >= length);
},'length-min');

v.extend(function(o) {
    var length = o.getAttribute('validator-length-max');
    return (o.value.length <= length);
},'length-max');

v.init();

document.getElementById('check').onclick = function(){
   alert(v.isValid() ? 'Valid' : 'Invalid' );
};