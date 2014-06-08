'use strict';
var heapdump = require('heapdump');
var http = require('http');
var trouble = require('./trouble');

var methods = 'one two three'.split(' ');

process.on('USR2', function () {
  global.gc();
});

function rnd() {
  return Math.random() * methods.length | 0;
}

function middleware(res, callback) {
  var _end = res.end;
  res.end = function(data) {
    _end.call(res, data);
    if (callback) {
      callback();
    }
  };
}

http.createServer(function (req, res) {
  // get the url without a query string
  var url = req.url.replace(/\?.*/, '');

  middleware(res, function () {
    res.emit('end');
  });

  if (url === '/') {
    var i = rnd();
    var method = trouble[methods[i]];
    res.writeHead(200, {'content-type': 'text/html'});
    method(res);
  } else if (trouble[url.slice(1)]) {
    res.writeHead(200, {'content-type': 'text/html'});
    trouble[url.slice(1)](res);
    res.on('end', function () {
      console.log('request done');
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(process.env.PORT || 8000);