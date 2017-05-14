'use strict';

const Expression = require('../model/Expression');

module.exports = class View {
	parse(expression, context) {
		context.trim();

		let operator = context.get();
		switch (operator) {
		case Expression.OPERATOR_ADD:
		case Expression.OPERATOR_SUB:
		case Expression.OPERATOR_MUL:
		case Expression.OPERATOR_DIV:
			expression.setOperator(operator);
			break;
		default:
			context.skip(-1);
		}
	}

	print(expression) {
		return expression.getOperator();
	}
};
