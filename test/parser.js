var test = require('tape');

var make = require('../parser');

// REMEMBER: fields are 0-indexed, while the external interface is 1-indexed

test('reasonability', function(t) {
  var p = make('\t', [2,1,0]);
  var line = 'a\tb\tc';

  t.equal(p(line), 'c\tb\ta\n');
  t.end();
})

test('trailing separator', function(t) {
  var p = make('\t', [2,1,0]);
  var line = 'a\tb\tc\t';

  t.equal(p(line), 'c\tb\ta\n');
  t.end();
})

test('exclusion of middle field', function(t) {
  var p = make('\t', [2,0]);
  var line = 'a\tb\tc';

  t.equal(p(line), 'c\ta\n');
  t.end();
})

test('unknown fields are empty', function(t) {
  var p = make('\t', [3]);
  var line = 'a\tb\tc';

  t.equal(p(line), '\n');
  t.end();
})
