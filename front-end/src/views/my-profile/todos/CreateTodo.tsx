import { useId, useState } from 'react';
import { CreateTodo } from './types/todo.types';
import Input from '@/components/common/Input';
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
		<form onSubmit={handleSubmit}>
			<label
				aria-label='Complete todo task?'
				aria-describedby={toggleId}
				className='text-gray-300 text-lg'
			/>
			<Input
				type='checkbox'
				id={toggleId}
				className='d-inline-block!'
				checked={todo.completed}
				onChange={handleChangeCompleted}
			/>

			<label
				aria-label='Add your todo'
				aria-describedby={inputTextId}
				className='d-inline-block text-gray-300 text-lg'
			/>
			<Input
				type='text'
				id={inputTextId}
				className='d-inline-block!'
				value={todo.todo}
				onChange={handleChangeTodo}
			/>

			<button type='submit'>Add Todo</button>
		</form>
	);
};

export default CreateTodo;
