import useTodos from './hooks/useTodos';
import CreateTodo from './CreateTodo';

const ViewTodo = () => {
	const { getTodos } = useTodos();

	const { data: todos } = getTodos();

	return (
		<>
			<h1 className='text-gray-300'>Todos: </h1>
			<hr />
			<ul className='list-style-none'>
				{todos?.map(({ id, todo, completed }) => {
					return (
						<li
							key={id}
							className='text-gray-300'>
							{todo}
							{completed ? '✅' : '❌'}
						</li>
					);
				})}
			</ul>

			<CreateTodo />
		</>
	);
};

export default ViewTodo;
