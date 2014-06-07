'use strict';
var http = require('http');
var stylus = require('stylus');
var fs = require('fs');

var files = 'one two three four'.split(' ').map(function (file) {
  return fs.readFileSync('./demos/' + file + '.styl', 'utf8');
});

function rnd() {
  return Math.random() * files.length | 0;
}

http.createServer(function (req, res) {
  var css = '/* empty */';

  var source = files[rnd()];

  try {
    stylus(source).render(function (error, result) {
      if (error) {
        if (console) {
          console.error(error);
        }
        return;
      }
      css = result.trim();
    });
  } catch (e) {}

  res.end(css);
}).listen(process.env.PORT || 8000);