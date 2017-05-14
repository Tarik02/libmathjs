'use strict';

let Decimal = require('decimal.js');
let Expression = require('../model/Expression');
let View = require('./View');

module.exports = class FunctionView extends View {
	parse(expression, context) {
		super.parse(expression, context);
		context.trim();

		let name = '', ch;
		while (!context.eof() && (ch = context.get()) !== '(')
			name += ch;
		if (context.eof() || name.length === 0)
			return false;
		expression.setName(name);

		let args = [];
		expression.setArguments(args);

		context.trim();
		if (context.ch() === ')') {
			return true;
		}

		do {
			let argument = context.parse();
			if (!argument) {
				context.pushError('expected-argument');
				return false;
			}

			args.push(argument);

			context.trim();
			if (context.ch() === ',') {
				context.get();
			}
		} while (context.ch() !== ')');
		context.get();

		return true;
	}

	print(expression) {
		return super.print(expression) + expression.getValue();
	}
};

