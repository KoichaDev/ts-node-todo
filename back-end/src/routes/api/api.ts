import express from 'express';
import auth from './auth/auth.router';
import todos from './todos/todos.router';

const api = express();

api.use(auth);
api.use(todos);

export default api;
