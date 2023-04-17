import express from 'express';
import { getTodos } from './todos.controller';

const todos = express();

todos.get('/todos', getTodos);

export default todos;
