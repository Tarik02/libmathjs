'use strict';

let tap = require('tap');
let assert = tap.assert;
let equal = tap.equal;

let mathjs = require('../lib/index.js');

equal(mathjs.parse('sqrt(25)').solve().toNumber(), 5);
equal(mathjs.parse('sin(90)').solve().toNumber(), 1);
equal(mathjs.parse('cos(0)').solve().toNumber(), 1);
equal(mathjs.parse('6^2').solve().toNumber(), 36);
equal(mathjs.parse('pow(10, 3)').solve().toNumber(), 300);

