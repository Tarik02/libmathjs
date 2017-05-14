'use strict';

const Controller = require('./Controller');
const Expression = require('../model/Expression');

module.exports = class NumberController extends Controller {
	solve(expression) {
		return expression.getValue();
	}
};
