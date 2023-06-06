import Todo from "../entities/Todo";
import HttpClient from "../http/HttpClient";
import TodosGateway from "./TodosGateway";

export default class TodosHttpGateway implements TodosGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async getTodos(): Promise<Todo[]> {
		const todosData = await this.httpClient.get("http://localhost:3000/todos");
		const todos: Todo[] = [];
		for (const todoData of todosData) {
			todos.push(new Todo(todoData.description, todoData.done));
		}
		return todos;
	}


}