'use strict';
module.exports = {
  one: function one(res) {
    var ctr = 0;
    while (true) {
      res.write(ctr++ + '');
    }
    res.end();
  },
  two: function two(res) {
    var ctr = 100;
    setInterval(function () {
      res.write(ctr-- + '');
    }, 200);

    setTimeout(function () {
      res.end();
    }, 200 * 100 + 20);
  },
  three: function three(res) {
    var ctr = 100;
    while (ctr--) {
      res.write(ctr+'');
    }
    res.end();
  },
};