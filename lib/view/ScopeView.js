'use strict';

const View = require('./View');

module.exports = class ScopeView extends View {
	parse(expression, context) {
		super.parse(expression, context);
		context.trim();

		if (context.get() !== '(')
			return false;

		let subExpressions = [];
		let subExpression;
		while (!context.eof() && context.ch() !== ')' && (subExpression = context.parse()))
			subExpressions.push(subExpression);
		expression.setExpressions(subExpressions);

		context.trim();
		if (context.get() !== ')') {
			context.pushError('expected-scope-close', -1);
			return false;
		}

		return true;
	}

	print(expression) {
		return super.print(expression) + '(' + expression.getExpressions().join('') + ')';
	}
};
