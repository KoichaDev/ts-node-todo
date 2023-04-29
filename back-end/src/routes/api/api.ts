import express from 'express';
import auth from './auth/auth.router';
import todos from './todos/todos.router';
import verifyJWT from '../../middleware/verifyJWT';

const api = express();

api.use(auth);
api.use(verifyJWT);
api.use(todos);

export default api;
