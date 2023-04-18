import useTodos from './hooks/useTodos';

const DeleteTodo = () => {
	const { getTodos, deleteTodoMutation } = useTodos();

	const { mutate } = deleteTodoMutation;

	const todos = getTodos().data?.data;

	const handleDeleteTodo = (id: string) => {
		mutate(id);
	};

	return (
		<ul>
			{todos?.map(({ id, todo }) => {
				return (
					<li key={id}>
						{todo}
						<button
							type='button'
							onClick={() => handleDeleteTodo(id)}>
							Delete
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default DeleteTodo;
