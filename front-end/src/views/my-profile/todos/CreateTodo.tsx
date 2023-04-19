import { useId, useState } from 'react';
import { CreateTodo } from './types/todo.types';
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
			<label htmlFor={inputTextId}>Todo</label>
			<input
				type='text'
				id={inputTextId}
				value={todo.todo}
				onChange={handleChangeTodo}
			/>

			<label htmlFor={toggleId}>Complete</label>
			<input
				type='checkbox'
				id={toggleId}
				checked={todo.completed}
				onChange={handleChangeCompleted}
			/>

			<button type='submit'>Add Todo</button>
		</form>
	);
};

export default CreateTodo;
