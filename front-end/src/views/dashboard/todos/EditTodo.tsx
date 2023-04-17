import { useId } from 'react';

const EditTodo = () => {
	const inputTextId = useId();
	const toggleId = useId();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor={inputTextId}>Todo</label>
			<input
				type='text'
				id={inputTextId}
			/>

			<label htmlFor={toggleId}>Complete</label>
			<input
				type='checkbox'
				id={toggleId}
			/>

			<button type='button'>Add Todo</button>
		</form>
	);
};

export default EditTodo;
