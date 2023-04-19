import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { CreateTodo } from '../types/todo.types';
import { fetchTodos, createTodo, deleteTodo } from '../services/todoService';
import { AxiosResponse, AxiosError } from 'axios';
import { Todo } from '../types/todo.types';

const useTodos = () => {
	const queryClient = useQueryClient();

	const getTodos = () => {
		return useQuery<Todo[], AxiosError>({
			queryKey: ['todos'],
			queryFn: fetchTodos,
		});
	};

	const createTodoMutation = useMutation({
		mutationKey: ['todos'],
		mutationFn: (payload: CreateTodo) => createTodo(payload),
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
