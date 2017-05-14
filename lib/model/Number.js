'use strict';

const Decimal = require('decimal.js');
const Expression = require('./Expression');

module.exports = class Number extends Expression {
	constructor() {
		super();
		this._value = new Decimal(0);
	}

	getValue() {
		return this._value;
	}

	setValue(value) {
		if (value instanceof Decimal) {
			this._value = value;
		} else {
			this._value = new Decimal(value);
		}
	}
};
