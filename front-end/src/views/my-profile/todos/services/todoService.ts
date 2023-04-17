import axios from 'axios';
import { CreateTodoTypes, FetchTodosData } from '../types/todo.types';

const URLS = {
	fetchTodos: 'http://localhost:8000/todos',
	createTodo: 'http://localhost:8000/todos',
};

export const fetchTodos = () => {
	return axios.get<FetchTodosData[]>(URLS.fetchTodos);
};

export const createTodo = (payload: CreateTodoTypes) => {
	return axios.post<CreateTodoTypes>(URLS.createTodo, payload);
};
