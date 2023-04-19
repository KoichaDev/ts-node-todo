import { useId, useState } from 'react';
import { Checkbox, Input, Button } from '@mantine/core';
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';

import useTodos from './hooks/useTodos';
import { Todo } from './types/todo.types';

const UpdateTodo = (props: Todo) => {
	const [changeTodo, setChangeTodo] = useState({ ...props });

	const { deleteTodoMutation } = useTodos();

	const todoCompleteId = useId();
	const todoId = useId();

	const handleDeleteTodo = (id: string) => {
		deleteTodoMutation.mutate(id);
	};

	const handleChangeCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedCompleted = e.target.checked;
		setChangeTodo((prevTodo) => {
			return { ...prevTodo, completed: updatedCompleted };
		});
	};

	const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				onChange={handleChangeTodo}
				placeholder='Todo...'
			/>

			<Button
				type='button'
				leftIcon={<BsFillTrash3Fill />}
				color='red'
				classNames={{
					root: 'border-radius-none!',
				}}
				onClick={handleDeleteTodo.bind(null, changeTodo.id)}>
				Delete
			</Button>
		</li>
	);
};

export default UpdateTodo;
