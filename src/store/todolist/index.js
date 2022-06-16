import { action } from "easy-peasy";

export const todolistStore = {

  todolist: [],
  todo: {},

  addTodo: action((state, payload) => {
    console.log(payload)
    state.todolist.push(payload);
  }),
  resetTodolist: action((state, payload) => {
    state.todolist = [],
    state.todo = {}
  }),
  loadTodo: action((state, payload) => {
    state.todo = payload
  })

};