import useTodos from './hooks/useTodos';
import CreateTodo from './CreateTodo';
import UpdateTodo from './UpdateTodo';

const ViewTodo = () => {
	const { getTodos } = useTodos();
	const { data: todos } = getTodos();

	return (
		<>
			<h1 className='text-gray-300'>Todo Dashboard: </h1>

			<CreateTodo />

			<h1 className='mt-10 mb-5 text-gray-300'>Today: </h1>

			<ul className='list-style-none'>
				{todos?.map((todo) => {
					return (
						<UpdateTodo
							key={todo.id}
							{...todo}
						/>
					);
				})}
			</ul>
		</>
	);
};

export default ViewTodo;
