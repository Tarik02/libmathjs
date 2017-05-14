'use strict';

const Parser = require('./Parser');
const parser = new Parser();

module.exports = {
	parse: string => {
		return parser.parse(string);
	}
};
