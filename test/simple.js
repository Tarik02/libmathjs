'use strict';

let tap = require('tap');
let assert = tap.assert;
let equal = tap.equal;

let mathjs = require('../lib/index.js');

equal(mathjs.parse('5.295e6').solve().toNumber(), 5295000);
equal(mathjs.parse('-5.295e6').solve().toNumber(), -5295000);
equal(mathjs.parse('2 + 2').solve().toNumber(), 4);
equal(mathjs.parse('2 + 2 * 2').solve().toNumber(), 6);
equal(mathjs.parse('(2 + 2) * 2').solve().toNumber(), 8);
equal(mathjs.parse('(5 * (8 - 2 + 1)) / 7').solve().toNumber(), 5);
equal(mathjs.parse('2 / 4').solve().toNumber(), 0.5);
equal(mathjs.parse('0.5 * 0.4').solve().toNumber(), 0.2);
equal(mathjs.parse('0 / 9').solve().toNumber(), 0);

