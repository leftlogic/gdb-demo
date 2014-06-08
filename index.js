'use strict';
var http = require('http');
var trouble = require('./trouble');

var methods = 'one two three'.split(' ');

function rnd() {
  return Math.random() * methods.length | 0;
}

http.createServer(function (req, res) {
  // get the url without a query string
  var url = req.url.replace(/\?.*/, '');

  if (url === '/') {
    var i = rnd();
    var method = trouble[methods[i]];

    console.log('method %s [%s]', method, i);

    res.writeHead(200, {'content-type': 'text/html'});
    method(res);
  } else if (trouble[url.slice(1)]) {
    res.writeHead(200, {'content-type': 'text/html'});
    trouble[url.slice(1)](res);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(process.env.PORT || 8000);