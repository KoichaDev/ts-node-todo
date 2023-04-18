import useTodos from './hooks/useTodos';
import CreateTodo from './CreateTodo';

const ViewTodo = () => {
	const { getTodos } = useTodos();

	const todos = getTodos().data?.data;

	return (
		<>
			<ul className='list-style-none'>
				{todos?.map(({ id, todo }) => {
					return <li key={id}>{todo}</li>;
				})}
			</ul>

			<CreateTodo />
		</>
	);
};

export default ViewTodo;
