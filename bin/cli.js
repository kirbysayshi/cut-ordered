#!/usr/bin/env node

var fs = require('fs');
var split = require('split2');

var makeParser = require('../parser');

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

var parser = makeParser(argv.d, fields);
var processor = split(parser);

if (files.length) {
  // process each file
  files.forEach(function(name) {
    fs.createReadStream(name)
    .pipe(processor, { end: false });
  })
} else {
  // stdin
  process.stdin
  .pipe(processor);
}

processor.pipe(process.stdout);
