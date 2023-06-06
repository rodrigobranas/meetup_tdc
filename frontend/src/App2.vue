<script setup lang="ts">
	import axios from 'axios';
import { onMounted, ref } from 'vue';

	const todos: any = ref([
		// { description: "A", done: false },
		// { description: "B", done: false },
		// { description: "C", done: false }
	]);
	const description = ref("");

	function getProgress () {
		const done = todos.value.filter((todo: any) => todo.done);
		return Math.round((done.length/todos.value.length) * 100);
	}

	function toggleDone (todo: any) {
		todo.done = !todo.done;
	}
	function addTodo () {
		todos.value.push({ description: description.value, done: false });
		description.value = "";
	}

	onMounted(async () => {
		const response = await axios.get("http://localhost:3000/todos");
		const todosData = response.data;
		todos.value.push(...todosData);
	});
</script>
<template>
	<h1 class="title">branas.io</h1>
	<div class="total">{{ todos.length }}</div>
	<div class="progress">{{ getProgress() }}%</div>
	<div v-for="todo in todos">
		<div class="todo-description">{{ todo.description }}</div>
		<button class="todo-done-button" @click="toggleDone(todo)">done/undone</button>
	</div>
	<input class="todo-input" type="text" v-model="description" @keyup.enter="addTodo()"/>
</template>
<style>
</style>
