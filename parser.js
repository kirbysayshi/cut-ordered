module.exports = function makeParser(sep, fields) {
  var s = ''

  var max = fields.reduce(function(m, c) {
    return Math.max(m, c);
  }, -1)

  for (var i = 0; i <= max; i++) {
    s += 'var sep' + i + ' = line.indexOf("' + sep + '", ' + (i > 0 ? 'sep' + (i-1) + ' > -1 ? sep' + (i-1) + '+1 : line.length' : '0') + ')\n';
  }

  fields.slice().sort(function(a, b) {
    return a - b;
  }).forEach(function (f, i) {
    var start = (f === 0 ? '0' : 'sep' + (f-1) + '+1');
    if (f === 0) {
      s += 'var f' + f + ' = line.slice(0, sep' + f + ');\n';
    } else {
      s += 'var f' + f + ' = sep' + (f-1) + ' > -1 ? line.slice(sep' + (f-1) + '+1, sep' + f + ' === -1 ? line.length : sep' + f + ') : "";\n';
    }
  })

  //s += 'console.log(line,sep0,sep1,sep2,f0,f2)\n'

  s += 'return ' + fields.map(function(i) {
    return '(f' + i + ' || "")';
  }).join(' + "' + sep + '" + ');

  s += ' + "\\n";'

  var f = new Function('line', s);
  return f;
}
