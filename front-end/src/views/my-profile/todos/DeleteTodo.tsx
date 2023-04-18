import useTodos from './hooks/useTodos';

const DeleteTodo = () => {
	const { getTodos, deleteTodoMutation } = useTodos();

	const todos = getTodos().data?.data;

	const handleDeleteTodo = (id: string) => {
		deleteTodoMutation.mutate(id);
	};

	return (
		<ul className='list-style-none'>
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
