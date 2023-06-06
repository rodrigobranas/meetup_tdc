import Todo from "./Todo";

export default class TodoList {
	todos: Todo[];

	constructor () {
		this.todos = [];
	}

	addTodo (description: string, done: boolean = false) {
		const todo = new Todo(description, done);
		this.todos.push(todo);
		return todo;
	}

	setTodos (todos: Todo[]) {
		this.todos.push(...todos);
	}

	getProgress () {
		const done = this.todos.filter((todo: Todo) => todo.done);
		if (done.length === 0) return 0;
		return Math.round((done.length/this.todos.length)*100);
	}

	getTotal () {
		return this.todos.length;
	}

}
