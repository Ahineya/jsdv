var v = new JSDV();

v.extend(function(o) {
  return o.val().match(/^((ht|f)tps?:\/\/)?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/i);
},'url');

v.init();