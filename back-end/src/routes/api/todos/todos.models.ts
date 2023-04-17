import crypto from 'crypto';

const TODOS = [
	{
		id: crypto.randomUUID(),
		todo: 'Learn TypeScript',
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		todo: 'Learn JavaScript',
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		todo: 'Learn React,js',
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		todo: 'Learn Vue.js',
		completed: false,
	},
];

export default TODOS;
