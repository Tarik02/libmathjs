'use strict';

const ParseContext = require('./ParseContext');
const Scope = require('./model/Scope');
const Number = require('./model/Number');
const Function = require('./model/Function');

const Container = require('./Container');

module.exports = class Parser extends ParseContext {
	constructor() {
		super('');
		this._text = null;

		this._models = [
			Container.make(Scope),
			Container.make(Number),
			Container.make(Function)
		];
	}

	parse(text) {
		if (this._text === null) {
			this._text = '(' + text + ')';
			this._position = 0;
		}

		for (let i in this._models) {
			let view = this._models[i];
			this._models[i] = Container.make(view.constructor);

			this.push();
			if (!view.parse(this)) {
				this.pop();

				if (this._errors.length !== 0) {
					for (let error of this._errors)
						console.error(error);
					this._errors = [];
					if (text)
						this._text = null;
					return null;
				}

				continue;
			}

			this.con();
			if (text)
				this._text = null;
			return view;
		}

		if (text)
			this._text = null;

		return null;
	}

	getParser() {
		return this;
	}
};
