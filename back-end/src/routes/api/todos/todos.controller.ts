import crypto from 'crypto';
import { Request, Response } from 'express';
import TODOS from './todos.models';

type TodoIdParams = {
	id: string;
};

type Todo = {
	todo: string;
	completed?: boolean;
};

const getTodos = (_: Request, res: Response) => {
	res.status(200).send(TODOS);
};

const createTodo = (req: Request<{}, {}, Todo>, res: Response) => {
	const { todo, completed } = req.body;

	if (!todo) {
		res.status(400).send({
			status: 400,
			error: {
				message: 'Missing Todo',
			},
		});
	}

	const payload = {
		id: crypto.randomUUID(),
		todo,
		completed: completed ?? false,
	};

	TODOS.push(payload);

	res.send({
		status: 201,
		message: `${todo} has been created`,
	});
};

const updateTodo = (req: Request<TodoIdParams, {}, Todo>, res: Response) => {
	const todoParamsId = req.params.id;
	const { todo, completed } = req.body;

	const hasId = TODOS.find((todo) => todo.id === todoParamsId);

	if (!hasId) {
		return res.status(422).send({
			status: 422,
			error: {
				message: 'Invalid ID',
			},
		});
	}

	const updatedIndex = TODOS.findIndex((todo) => todo.id === todoParamsId);

	TODOS[updatedIndex].todo = todo;
	TODOS[updatedIndex].completed = completed as boolean;

	return res.send({
		status: 200,
		message: `Success`,
	});
};

const deleteTodo = (req: Request<TodoIdParams, {}>, res: Response) => {
	const paramsId = req.params.id;

	const hasId = TODOS.find((todo) => todo.id === paramsId);

	if (!hasId) {
		return res.status(422).send({
			status: 422,
			error: {
				message: 'Invalid ID',
			},
		});
	}

	const index = TODOS.findIndex((todo) => todo.id === paramsId);

	TODOS.splice(index, 1);

	return res.send({
		status: 200,
		message: `Deleted`,
	});
};

export { deleteTodo, getTodos, createTodo, updateTodo };
