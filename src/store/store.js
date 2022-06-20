import { createStore } from 'easy-peasy';

import { todolistStore } from './todolist/index.js';
import { userStore } from './user/index.js';

const globalModel = {
  todolist: todolistStore,
  user: userStore
};

const GlobalStore = createStore(globalModel);
export default GlobalStore;