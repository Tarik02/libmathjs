'use strict';

const Decimal = require('decimal.js');
const Controller = require('./Controller');
const Expression = require('../model/Expression');

module.exports = class ScopeController extends Controller {
	solve(expression) {
		let exps = expression.getExpressions();
		let nexps = [];

		for (let exp of exps) {
			switch (exp.getOperator()) {
			case Expression.OPERATOR_ADD:
				nexps.push(exp.solve());
				break;
			case Expression.OPERATOR_SUB:
				nexps.push(exp.solve().mul(-1));
				break;
			case Expression.OPERATOR_MUL:
				nexps.push(nexps.pop().mul(exp.solve()));
				break;
			case Expression.OPERATOR_DIV:
				nexps.push(nexps.pop().div(exp.solve()));
				break;
			}
		}

		let result = new Decimal(0);
		for (let exp of nexps) {
			result = result.add(exp);
		}

		return result;
	}
};
