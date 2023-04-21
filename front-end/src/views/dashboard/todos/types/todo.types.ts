export type Todo = {
	readonly id?: string;
	todo: string;
	completed: boolean;
};

export type CreateTodo = {
	todo: string;
	completed: boolean;
};
