'use strict';

let Decimal = require('decimal.js');
let Controller = require('./Controller');
let Expression = require('../model/Expression');

module.exports = class FunctionController extends Controller {
	solve(expression) {
		let name = expression.getName();
		let args = expression.getArguments();
		switch (name) {
		case 'sqrt':
			if (args.length !== 1)
				throw new Error('Function sqrt requires 1 argument.');
			return args[0].solve().sqrt();
		case 'sin':
			if (args.length !== 1)
				throw new Error('Function sin requires 1 argument.');
			return Decimal.sin(args[0].solve().mul(Decimal.acos(-1)).div(180));
		case 'cos':
			if (args.length !== 1)
				throw new Error('Function cos requires 1 argument.');
			return Decimal.cos(args[0].solve().mul(Decimal.acos(-1)).div(180));
		default:
			throw new Error('Function ' + name + ' is not implemented.');
		}
	}
};

