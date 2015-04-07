
cut-ordered
===========

UNIX cut(1) is a great utility, but I found myself wanting to often reorder fields. This cmd utility attempts to be similar in terms of API to `cut(1)` but respects the given column order.

Usage
--------

```sh
npm install -g cut-ordered
```

```sh
echo 'a b c' | cut-ordered -f 3,2,1 -d ' '
c b a
```

```sh
echo 'a b c' | cut-ordered -f 3,1 -d ' '
c a
```

Benchmarking
------------

The [line parser](./parser.js) is a custom compiled function: while gross-looking this means it should execute as quickly as possible (currently about 1.3x as slow as `cut(1)`). To compare the two:

```sh
npm run bench
...

cut

real  0m5.698s
user  0m5.366s
sys 0m0.133s

cut-ordered

real  0m7.646s
user  0m6.717s
sys 0m0.873s
```

License
-------

MIT

