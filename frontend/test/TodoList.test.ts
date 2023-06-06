import TodoList from "../src/entities/TodoList";

test("Deve testar a todo list", async function () {
	const todoList = new TodoList();
	expect(todoList.getTotal()).toBe(0);
	expect(todoList.getProgress()).toBe(0);
	const a = todoList.addTodo("A");
	const b = todoList.addTodo("B");
	const c = todoList.addTodo("C");
	expect(todoList.getTotal()).toBe(3);
	a.toggleDone();
	expect(todoList.getProgress()).toBe(33);
	b.toggleDone();
	expect(todoList.getProgress()).toBe(67);
	c.toggleDone();
	expect(todoList.getProgress()).toBe(100);
});
