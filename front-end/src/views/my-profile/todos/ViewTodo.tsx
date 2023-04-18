import useTodos from './hooks/useTodos';

const ViewTodo = () => {
	const { getTodos } = useTodos();

	const todos = getTodos().data?.data;

	return (
		<ul className='list-style-none'>
			{todos?.map(({ id, todo }) => {
				return <li key={id}>{todo}</li>;
			})}
		</ul>
	);
};

export default ViewTodo;