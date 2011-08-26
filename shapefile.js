var piOverTwo = Math.PI / 2.0;
var deg2rad = Math.PI / 180.0;

function Point (x, y) {
  this.x = x;
  this.y = y;
}

function ll2Orthoxy (lat, lon) {
  lat *= deg2rad;
  lon *= deg2rad;
  var slat = Math.sin (piOverTwo - lat);
  return new Point (400 + slat * Math.cos (lon) * 800, 800 - (800 + slat * Math.sin (lon) * 800));
}

function endianSwap (num) {
  //The shift then mask on the end prevents a sign issue.
  return ((num & 0xFF) << 24) | ((num & 0xFF00) << 8) | ((num & 0xFF0000) >> 8) | ((num >> 24) & 0xFF);
}

// Code from https://developer.mozilla.org/En/Using_XMLHttpRequest#Receiving_binary_data
function load_binary_resource (url) {
  var req = new XMLHttpRequest ();
  req.open ('GET', url, false);
  req.overrideMimeType('text/plain; charset=x-user-defined');
  req.send (null);
  if (req.status != 200) return '';
    return req.responseText;
}

function Header (shx) {
  this.header = new Array ();
  for (var i = 0; i < 7; ++i)
    this.header[i] = endianSwap (shx.readInt32 ());
  for (var i = 7; i < 9; ++i)
    this.header[i] = shx.readInt32 ();
  for (var i = 9; i < 17; ++i)
    this.header[i] = shx.readDouble ();

  this.offsets = new Array ();
  this.numShapes = 0;
  while (this.numShapes * 8 + 100 < this.header[6] * 2) {
    var offset = endianSwap (shx.readInt32 ()) * 2;
    var contentLen = endianSwap (shx.readInt32 ()) * 2;
    this.offsets[this.numShapes++] = offset + 8;
  }
}

function Shape (shp, num) {
  this.header = new Array ();
  this.header[0] = shp.readInt32 ();
  for (var i = 1; i < 5; ++i)
    this.header[i] = shp.readDouble ();
  for (var i = 5; i < 7; ++i)
    this.header[i] = shp.readInt32 ();
  for (var i = 7; i < this.header[5] + 7; ++i)
    this.header[i] = shp.readInt32 ();

  this.points = new Array ();
  for (var i = 0; i < this.header[6]; ++i) {
    var lon = shp.readDouble ();
    var lat = shp.readDouble ();
    this.points[i] = new Point (lat, lon);
  }
}

function ShapeFile (name) {
  var shx = new BinaryReader (load_binary_resource (name + '.shx'));
  this.header = new Header (shx);
  
  var shp = new BinaryReader (load_binary_resource (name + '.shp'));
  this.shapes = new Array();
  for (var i = 0; i < this.header.numShapes; ++i) {
    shp.seek (this.header.offsets[i]);
    this.shapes[i] = new Shape (shp, i);
  }
}

