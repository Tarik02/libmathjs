'use strict';

let Parser = require('./Parser');

let parser = new Parser();

module.exports = {
	parse: string => {
		return parser.parse(string);
	}
};
