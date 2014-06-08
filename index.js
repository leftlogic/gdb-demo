'use strict';
var http = require('http');
var trouble = require('./trouble');

var methods = 'one two three'.split(' ');

function rnd() {
  return Math.random() * methods.length | 0;
}

http.createServer(function (req, res) {
  var i = rnd();
  var method = trouble[methods[i]];

  console.log('method %s [%s]', method, i);

  res.writeHead(200, {'content-type': 'text/html'});
  method(res);
}).listen(process.env.PORT || 8000);