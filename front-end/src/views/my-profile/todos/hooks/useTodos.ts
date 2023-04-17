import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTodoTypes } from '../types/todo.types';
import { fetchTodos, createTodo } from '../services/todoService';

const useTodos = () => {
	const queryClient = useQueryClient();

	const getTodos = () => {
		return useQuery({
			queryKey: ['todos'],
			queryFn: fetchTodos,
		});
	};

	const createTodoMutation = useMutation({
		mutationKey: ['todos'],
		mutationFn: (payload: CreateTodoTypes) => createTodo(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return { getTodos, createTodoMutation };
};

export default useTodos;
