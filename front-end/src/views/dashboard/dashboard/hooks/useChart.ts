import useTodos from '../../todos/hooks/useTodos';

const useChart = () => {
	const getTodoDataCompletion = () => {
		const { getTodos } = useTodos();
		const todos = getTodos()?.data;

		const completedTodos = todos?.filter((todo) => todo.completed).length;
		const incompleteTodos = todos?.filter((todo) => !todo.completed).length;

		return {
			labels: ['Completed', 'Not Completed'],
			datasets: [
				{
					label: '% of Todos',
					data: [completedTodos, incompleteTodos],
					backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'],
					borderWidth: 0,
				},
			],
		};
	};

	return { getTodoDataCompletion };
};

export default useChart;
