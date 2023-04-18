import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTodoTypes } from '../types/todo.types';
import { fetchTodos, createTodo, deleteTodo } from '../services/todoService';
import { AxiosResponse, AxiosError } from 'axios';

const useTodos = () => {
	const queryClient = useQueryClient();

	const getTodos = () => {
		return useQuery<AxiosResponse, AxiosError>({
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

	const deleteTodoMutation = useMutation({
		mutationKey: ['todos'],
		mutationFn: (id: string) => deleteTodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return { getTodos, createTodoMutation, deleteTodoMutation };
};

export default useTodos;
