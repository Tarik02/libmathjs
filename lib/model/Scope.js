'use strict';

let Expression = require('./Expression');

module.exports = class Scope extends Expression {
	constructor() {
		super();
		this._expression = [];
	}

	getExpressions() {
		return this._expressions;
	}

	setExpressions(expressions) {
		this._expressions = expressions;
	}
};

