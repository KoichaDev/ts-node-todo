import { useQuery } from '@tanstack/react-query';

import { fetchTodos } from '../services/todoService';
const useTodos = () => {
	const getTodos = () => {
		return useQuery({
			queryKey: ['todos'],
			queryFn: fetchTodos,
		});
	};

	return { getTodos };
};

export default useTodos;
