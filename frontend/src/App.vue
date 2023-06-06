<script setup lang="ts">
	import axios from 'axios';
	import { inject, onMounted, ref } from 'vue';
	import TodoList from './entities/TodoList';
import TodosHttpGateway from './gateways/TodosHttpGateway';
import AxiosAdapter from './http/AxiosAdapter';
import TodosGateway from './gateways/TodosGateway';

	const todoList = ref(new TodoList());
	const description = ref("");

	onMounted(async () => {
		// const httpClient = new AxiosAdapter();
		// const todosGateway = new TodosHttpGateway(httpClient);
		const todosGateway = inject("todosGateway") as TodosGateway;
		const todos = await todosGateway.getTodos();
		todoList.value.setTodos(todos);
	});
</script>
<template>
	<h1 class="title">branas.io</h1>
	<div class="total">{{ todoList.getTotal() }}</div>
	<div class="progress">{{ todoList.getProgress() }}%</div>
	<div v-for="todo in todoList.todos">
		<div class="todo-description">{{ todo.description }}</div>
		<button class="todo-done-button" @click="todo.toggleDone()">done/undone</button>
	</div>
	<input class="todo-input" type="text" v-model="description" @keyup.enter="todoList.addTodo(description)"/>
</template>
<style>
</style>
