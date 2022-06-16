import React from 'react'
import TodoList from './todolist/TodoList.js'

export default function SplashScreen({ navigation, route }) {

  return <TodoList route={route} />
}