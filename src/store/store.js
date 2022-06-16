import { createStore } from 'easy-peasy';

import { todolistStore } from './todolist/index.js';

const globalModel = {
  todolist: todolistStore,
};

const GlobalStore = createStore(globalModel);
export default GlobalStore;