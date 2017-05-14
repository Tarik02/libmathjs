'use strict';

module.exports = class ParseContext {
	constructor(text, position) {
		if (text instanceof ParseContext) {
			this._text = text._text;
			this._position = text._position;
		} else if (typeof text !== 'string') {
			throw new Error("Text must be a string.");
		} else {
			this._text = text.toString();
			if (isNaN(this._position = parseInt(position || 0))) {
				this._position = 0;
			}
		}

		this._stack = [];
		this._errors = [];
	}

	getText() {
		return this._text;
	}

	getPosition() {
		return this._position;
	}

	push() {
		this._stack.push(this._position);
	}

	pop() {
		this._position = this._stack.pop();
	}

	con() {
		this._stack.pop();
	}

	skip(count) {
		this._position += count || 1;
	}

	ch() {
		let i = this._position;
		while (' \t'.indexOf(this._text[i++]) !== -1);
		return this._text[i];
	}

	get(count) {
		if (!!count) {
			let result = this._text.substr(this._position, count);
			this._position += count;
			return result;
		}

		return this._text[this._position++];
	}

	trim() {
		while (!this.eof() && this.get() === ' ');
		this.skip(-1);
	}

	eof() {
		return this._position >= this._text.length;
	}


	pushError(name, relativeStart, relativeEnd) {
		let start = this._position;
		let end = null;

		if (relativeStart) {
			start += relativeStart;
		}
		if (relativeEnd) {
			end = start + relativeEnd;
		}

		this._errors.push({
			name: name,
			start: start,
			end: end
		});
	}


	getParser() {
		throw new Exception("Method is not implemented.");
	}

	parse() {
		return this.getParser().parse();
	}
};
