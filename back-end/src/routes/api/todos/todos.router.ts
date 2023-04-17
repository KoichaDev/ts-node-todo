import express from 'express';
import { getTodos, createTodo } from './todos.controller';

const todos = express();

todos.get('/todos', getTodos);
todos.post('/todos', createTodo);

export default todos;
