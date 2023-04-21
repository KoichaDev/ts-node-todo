import { createContext, useState } from 'react';

type TodoContextType = {
	isUpdateMode: boolean;
	setIsUpdateMode: (toggle: boolean) => void;
};

const TodoContext = createContext<TodoContextType>({
	isUpdateMode: false,
	setIsUpdateMode: () => {},
});

type TodoProviderProps = {
	children: React.ReactNode;
};

const TodoProvider = ({ children }: TodoProviderProps) => {
	const [isUpdateMode, setIsUpdateMode] = useState(false);

	const todoCtx = {
		isUpdateMode,
		setIsUpdateMode,
	};
	return <TodoContext.Provider value={todoCtx}>{children}</TodoContext.Provider>;
};

export { TodoContext as todoContext };

export default TodoProvider;
