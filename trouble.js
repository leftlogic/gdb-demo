'use strict';

function Message(s) {
  this.value = s;
}

Message.prototype.toString = function () {
  return this.value + '<!-- padding ' + new Array(2048).join(' ') + '-->';
};

module.exports = {
  one: function one(res) {
    var ctr = 0;
    var m;

    while (true) {
      ctr++;
      m = new Message('.\n');
      res.write(m.toString());
    }
    res.end();
  },
  two: function two(res) {
    var ctr = 100;
    setInterval(function () {
      ctr--;
      var m = new Message((100 - ctr) + '\n');
      res.write(m.toString());
    }, 20);

    setTimeout(function () {
      res.end();
    }, (20 * 100) + 201);
  },
  three: function three(res) {
    var ctr = 100;
    var m;
    while (ctr--) {
      m = new Message('.\n');
      res.write(m.toString());
    }
    res.end();
  },
};