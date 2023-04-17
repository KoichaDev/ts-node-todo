import crypto from 'crypto';

type TODOS = {
	id: string;
	todo: string;
	completed: Boolean;
};

const todos: TODOS[] = [
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

export default todos;
