export default function useTodo() {

  const checked = (task, list, index) => {
    let newStatus = null
    if (task.status === 0) {
      newStatus = 1
    } else {
      newStatus = 0
    }
    const updateTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: newStatus,
      image: task.image,
      level: task.level
    }
    list.splice(index, 1, updateTask)
    return list
  }

  const deleteTask = (todoList, index) => {
    const newList = todoList.filter(function(item, i) { return i !== index })
    return newList
  }

  return {
    checked,
    deleteTask,
  }
}