import axios from 'axios';

export type TodosData = {
	readonly id: string;
	todo: string;
	completed: Boolean;
};

const URLS = {
	fetchTodos: 'http://localhost:8000/todos',
};

export const fetchTodos = () => {
	return axios.get<TodosData[]>(URLS.fetchTodos);
};
