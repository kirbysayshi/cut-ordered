var fs = require('fs');
var through = require('through2');
var split = require('split2');

var argv = require('minimist')(process.argv.slice(2), {
  '--': true,
  boolean: ['s'],
  string: ['f'],
  default: {
    d: '\t'
  }
});

var files = argv._;
var fields = (argv.f || '')
  .split(',')
  .filter(Boolean)
  .map(function(f) { return parseInt(f, 10) - 1; });

var processor = through({ decodeStrings: false }, function(chunk, enc, cb) {
  var cols = chunk.split(argv.d);
  var line = '';

  for (var i = 0; i < fields.length; i++) {
    line += cols[fields[i]] + argv.d;
  }

  this.push(line + '\n');
  cb();
})

if (files.length) {
  // process each file
  files.forEach(function(name) {
    fs.createReadStream(name)
    .pipe(split())
    .pipe(processor, { end: false });
  })
} else {
  // stdin
  process.stdin
  .pipe(split())
  .pipe(processor);
}

processor.pipe(process.stdout);
