'use strict';

const Decimal = require('decimal.js');
const Expression = require('../model/Expression');
const View = require('./View');

function isN(c) {
	return c >= '0' && c <= '9';
}

module.exports = class NumberView extends View {
	parse(expression, context) {
		super.parse(expression, context);
		context.trim();

		let beforeDot = '', afterDot = '', afterE = '';
		let wasDot = false, wasE = false;

		let ch;
		while (!context.eof()) {
			ch = context.get();

			if (wasE) {
				if (isN(ch)) {
					afterE += ch;
				} else {
					break;
				}
			} else if (wasDot) {
				if (isN(ch)) {
					afterDot += ch;
				} else if ('eE'.indexOf(ch) !== -1) {
					wasE = true;
				} else {
					break;
				}
			} else {
				if (isN(ch)) {
					beforeDot += ch;
				} else if ('.,'.indexOf(ch) !== -1) {
					wasDot = true;
				} else if ('eE'.indexOf(ch) !== -1) {
					wasE = true;
				} else {
					break;
				}
			}
		}

		if (beforeDot === '') {
			if (!wasDot)
				return false;
			if (afterDot === '')
				return false;
			beforeDot = '0';
		}

		if (!context.eof())
			context.skip(-1);
		expression.setValue(beforeDot + (wasDot ? '.' + afterDot : '') + (wasE ? 'e' + afterE : ''));
		return true;
	}

	print(expression) {
		return super.print(expression) + expression.getValue();
	}
};
