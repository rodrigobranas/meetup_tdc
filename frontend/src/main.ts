import { createApp } from 'vue'
import App from "./App.vue";
import './style.css'
import TodosHttpGateway from './gateways/TodosHttpGateway';
import AxiosAdapter from './http/AxiosAdapter';

const app = createApp(App);
const httpClient = new AxiosAdapter();
const todosGateway = new TodosHttpGateway(httpClient);
app.provide("todosGateway", todosGateway);
app.mount('#app');
