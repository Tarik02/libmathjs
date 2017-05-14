'use strict';

const MODEL_HASH_SYMBOL = Symbol();
const connections = [
	{
		model: require('./model/Scope'),
		view: require('./view/ScopeView'),
		controller: require('./controller/ScopeController')
	}, {
		model: require('./model/Number'),
		view: require('./view/NumberView'),
		controller: require('./controller/NumberController')
	}, {
		model: require('./model/Function'),
		view: require('./view/FunctionView'),
		controller: require('./controller/FunctionController')
	}
];

let modelClasses = {};

for (let connection of connections) {
	let modelClass = connection.model;
	let viewClass = connection.view;
	let controllerClass = connection.controller;

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

