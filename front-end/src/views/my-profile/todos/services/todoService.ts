import axios from 'axios';
import { CreateTodo, Todo } from '../types/todo.types';

const BASE_URL = 'http://localhost:8000';

const URLS = {
	fetchTodos: `${BASE_URL}/todos`,
	createTodo: `${BASE_URL}/todos`,
	deleteTodo: (id: string) => `${BASE_URL}/todos/${id}`,
};

export const fetchTodos = (): Promise<Todo[]> => {
	return axios.get(URLS.fetchTodos).then((res) => res.data);
};

export const createTodo = (payload: CreateTodo) => {
	return axios.post<CreateTodo>(URLS.createTodo, payload);
};

export const deleteTodo = (id: string) => {
	return axios.delete(URLS.deleteTodo(id));
};
