import { useId, useState, useEffect } from 'react';
import { Checkbox, Input, Button } from '@mantine/core';
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import useTodos from './hooks/useTodos';
import { Todo } from './types/todo.types';

const UpdateTodo = (props: Todo) => {
	const [changeTodo, setChangeTodo] = useState({ ...props });
	const todoId = useId();
	const todoCompleteId = useId();
	const { deleteTodoMutation, updateTodoMutation } = useTodos();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const payload = {
				id: changeTodo.id,
				todo: changeTodo.todo,
				completed: changeTodo.completed,
			};
			updateTodoMutation.mutate(payload);
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, [changeTodo.todo]);

	const handleDeleteTodo = (id: string) => {
		deleteTodoMutation.mutate(id);
	};

	const handleChangeCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedCompleted = e.target.checked;

		setChangeTodo((prevTodo) => {
			return { ...prevTodo, completed: updatedCompleted };
		});
	};

	const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		const updatedValue = e.target.value;

		setChangeTodo((prevTodo) => {
			return { ...prevTodo, todo: updatedValue };
		});
	};

	return (
		<li className='flex-row'>
			<label
				aria-label='Complete todo task?'
				aria-describedby={todoCompleteId}
			/>
			<Checkbox
				id={todoCompleteId}
				color='teal'
				size='xl'
				classNames={{ input: 'bg-gray-700 border-radius-none! cursor-pointer' }}
				checked={changeTodo.completed}
				onChange={handleChangeCompleted}
			/>

			<label
				aria-label='Add your todo'
				aria-describedby={todoId}
			/>
			<Input
				type='text'
				icon={<BsPencilSquare />}
				className='w-full'
				classNames={{
					input: 'bg-gray-700 text-white border-radius-none!',
				}}
				id={todoId}
				value={changeTodo.todo}
				onChange={(e) => handleChangeTodo(e, changeTodo.id as string)}
				placeholder='Todo...'
			/>

			<Button
				type='button'
				leftIcon={<BsFillTrash3Fill />}
				color='red'
				classNames={{
					root: 'border-radius-none!',
				}}
				onClick={handleDeleteTodo.bind(null, changeTodo.id as string)}>
				Delete
			</Button>
		</li>
	);
};

export default UpdateTodo;
