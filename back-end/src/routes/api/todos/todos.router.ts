import express from 'express';
import { getTodos, createTodo, deleteTodo } from './todos.controller';

const todos = express();

todos.get('/todos', getTodos);
todos.post('/todos', createTodo);
todos.delete('/todos/:id', deleteTodo);

export default todos;
