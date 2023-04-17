import { Request, Response } from 'express';
import TODOS from './todos.models';

const getTodos = (_: Request, res: Response) => {
	res.status(200).send(TODOS);
};

export { getTodos };
