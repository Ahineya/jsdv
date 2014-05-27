var v = new JSDV();

v.extend(function(o) {
  return o.val().match(/^((ht|f)tps?:\/\/)?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/i);
},'url');

v.extend(function(o) {
    var length = o.attr('validator-length');
    return (o.val().length > length);
},'length-min');

v.extend(function(o) {
    var length = o.attr('validator-length');
    return (o.val().length <= length);
},'length-max');

v.init();