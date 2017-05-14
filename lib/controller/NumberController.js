'use strict';

let Controller = require('./Controller');
let Expression = require('../model/Expression');

module.exports = class NumberController extends Controller {
	solve(expression) {
		return expression.getValue();
	}
};

