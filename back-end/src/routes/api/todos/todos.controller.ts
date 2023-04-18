import crypto from 'crypto';
import { Request, Response } from 'express';
import TODOS from './todos.models';

type TodoParamsId = {
	id: string;
};

type CreateTodo = {
	todo: string;
	completed: false;
};

const getTodos = (_: Request, res: Response) => {
	res.status(200).send(TODOS);
};

const createTodo = (req: Request<{}, {}, CreateTodo>, res: Response) => {
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

const deleteTodo = (req: Request<TodoParamsId, {}>, res: Response) => {
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

export { getTodos, createTodo, deleteTodo };
