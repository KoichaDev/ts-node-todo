export type Todo = {
	readonly id: string;
	todo: string;
	completed: Boolean;
};

export type CreateTodo = {
	todo: string;
	completed: boolean;
};
