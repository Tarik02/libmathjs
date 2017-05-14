'use strict';

let Expression = module.exports = class {
	constructor() {
		this._view = null;
		this._controller = null;

		this._operator = Expression.OPERATOR_ADD;
	}

	init(view, controller) {
		this._view = view;
		this._controller = controller;
		return this;
	}

	getView() {
		return this._view;
	}

	getController() {
		return this._controller;
	}

	solve() {
		return this.getController().solve(this);
	}

	parse(context) {
		return this.getView().parse(this, context);
	}

	print() {
		return this.getView().print(this);
	}


	getOperator() {
		return this._operator;
	}

	setOperator(operator) {
		this._operator = operator;
	}
};

Expression.OPERATOR_ADD = '+';
Expression.OPERATOR_SUB = '-';
Expression.OPERATOR_MUL = '*';
Expression.OPERATOR_DIV = '/';

