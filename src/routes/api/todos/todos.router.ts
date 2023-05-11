import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from './todos.controller';

const todos = express();

todos.get('/todos', getTodos);
todos.post('/todos', createTodo);
todos.patch('/todos/:id', updateTodo);
todos.delete('/todos/:id', deleteTodo);

export default todos;
