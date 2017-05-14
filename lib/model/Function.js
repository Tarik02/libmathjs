'use strict';

const Decimal = require('decimal.js');
const Expression = require('./Expression');

module.exports = class Function extends Expression {
	constructor() {
		super();
		this._name = '';
		this._arguments = [];
	}

	getName() {
		return this._name;
	}

	setName(name) {
		this._name = name;
	}

	getArguments() {
		return this._arguments;
	}

	setArguments(args) {
		this._arguments = args;
	}
};
