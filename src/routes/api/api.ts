import express from 'express';
import auth from './auth/auth.router';
import todos from './todos/todos.router';
import verifyJWT from '../../middleware/verifyJWT';
import token from './token/token.router';

const api = express();

api.use(auth);
api.use(token);
api.use(verifyJWT);
api.use(todos);

export default api;
