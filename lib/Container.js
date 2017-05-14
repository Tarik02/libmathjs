'use strict';

const MODEL_HASH_SYMBOL = Symbol();
const connections = [
	'Scope',
	'Number',
	'Function'
];

let modelClasses = {};

for (let connection of connections) {
	let modelClass = require(`./model/${connection}`);
	let viewClass = require(`./view/${connection}View`);
	let controllerClass = require(`./controller/${connection}Controller`);

	let view = new (viewClass.bind.call(viewClass))();
	let controller = new (controllerClass.bind.call(controllerClass))();

	modelClasses[modelClass[MODEL_HASH_SYMBOL] = Symbol()] = {
		view: view,
		controller: controller
	};
}

module.exports = {
	view: modelClass => {
		return modelClasses[modelClass[MODEL_HASH_SYMBOL]].view;
	},

	controller: modelClass => {
		return modelClasses[modelClass[MODEL_HASH_SYMBOL]].controller;
	},

	make: modelClass => {
		let set = modelClasses[modelClass[MODEL_HASH_SYMBOL]];
		return (new (modelClass.bind.call(modelClass))()).init(set.view, set.controller);
	}
};

