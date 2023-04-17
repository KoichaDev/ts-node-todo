import crypto from 'crypto';
import { Request, Response } from 'express';
import TODOS from './todos.models';

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

	console.log(TODOS);

	res.send({
		status: 200,
		message: `${todo} has been created`,
	});
};

export { getTodos, createTodo };
