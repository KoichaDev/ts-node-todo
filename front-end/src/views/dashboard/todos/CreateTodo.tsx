import { useId, useState } from 'react';
import { CreateTodo } from './types/todo.types';
import { Checkbox, Input, Button } from '@mantine/core';
import { BsPlusLg, BsPencilSquare } from 'react-icons/bs';
import useTodos from './hooks/useTodos';

const initState = {
	todo: '',
	completed: false,
};

const CreateTodo = () => {
	const [todo, setTodo] = useState<CreateTodo>(initState);
	const inputTextId = useId();
	const toggleId = useId();

	const { createTodoMutation } = useTodos();

	const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const enteredTodo = e.target.value;

		setTodo((prevTodo) => {
			return { ...prevTodo, todo: enteredTodo };
		});
	};

	const handleChangeCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
		const toggleTodoCompleted = e.target.checked;
		setTodo((prevTodo) => {
			return { ...prevTodo, completed: toggleTodoCompleted };
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createTodoMutation.mutate(todo);
		setTodo(initState);
	};

	return (
		<form
			className='flex-row align-items-center mt-10'
			onSubmit={handleSubmit}>
			<label
				aria-label='Complete todo task?'
				aria-describedby={toggleId}
			/>
			<Checkbox
				id={toggleId}
				size='xl'
				color='teal'
				classNames={{ input: 'bg-gray-700  border-radius-none! cursor-pointer' }}
				checked={todo.completed}
				onChange={handleChangeCompleted}
			/>

			<label
				aria-label='Add your todo'
				aria-describedby={inputTextId}
			/>
			<Input
				type='text'
				icon={<BsPencilSquare />}
				className='w-full'
				classNames={{
					input: 'bg-gray-700 text-white  border-radius-none!',
				}}
				id={inputTextId}
				value={todo.todo}
				onChange={handleChangeTodo}
				placeholder='Todo...'
			/>

			<Button
				leftIcon={<BsPlusLg />}
				classNames={{
					root: 'border-radius-none!',
				}}
				type='submit'
				color='green'>
				Add Todo
			</Button>
		</form>
	);
};

export default CreateTodo;
