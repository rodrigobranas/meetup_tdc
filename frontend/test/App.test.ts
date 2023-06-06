import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue";
import AxiosAdapter from "../src/http/AxiosAdapter";
import TodosHttpGateway from "../src/gateways/TodosHttpGateway";
import TodosGateway from "../src/gateways/TodosGateway";
import Todo from "../src/entities/Todo";

async function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

test("Deve testar a todo list", async function () {
	const httpClient = new AxiosAdapter();
	// const todosGateway = new TodosHttpGateway(httpClient);
	const todosGateway: TodosGateway = {
		async getTodos (): Promise<Todo[]> {
			return [
				new Todo("A", false),
				new Todo("B", false),
				new Todo("C", false)
			];
		}
	}
	const wrapper = mount(AppVue, {
		global: {
			provide: {
				todosGateway
			}
		}
	});
	expect(wrapper.get(".title").text()).toBe("branas.io");
	await sleep(200);
	expect(wrapper.findAll(".todo-description").at(0)?.text()).toBe("A");
	expect(wrapper.findAll(".todo-description").at(1)?.text()).toBe("B");
	expect(wrapper.findAll(".todo-description").at(2)?.text()).toBe("C");
	expect(wrapper.get(".total").text()).toBe("3");
	expect(wrapper.get(".progress").text()).toBe("0%");
	await wrapper.findAll(".todo-done-button").at(0)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("33%");
	await wrapper.findAll(".todo-done-button").at(1)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("67%");
	await wrapper.findAll(".todo-done-button").at(2)?.trigger("click");
	expect(wrapper.get(".progress").text()).toBe("100%");
	await wrapper.get(".todo-input").setValue("D");
	await wrapper.get(".todo-input").trigger("keyup.enter");
	expect(wrapper.get(".total").text()).toBe("4");
	expect(wrapper.get(".progress").text()).toBe("75%");
	// @ts-ignore
	// expect(wrapper.get(".todo-input").element.value).toBe("");
});
