import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import TodoList from '../screens/todolist/TodoList'
import TodoDetail from '../screens/tododetail/TodoDetail'


const Stack = createNativeStackNavigator()

const TodoListStack = () => {
  return (
    <Stack.Navigator initialRouteName="splashscreen" headerMode="None" mode="modal" screenOptions={{headerShown: false}}>
      <Stack.Screen name="splashscreen" component={SplashScreen} />
      <Stack.Screen name="todolist" component={TodoList} />
      <Stack.Screen name="tododetail" component={TodoDetail} />
    </Stack.Navigator>
  )
}

export default TodoListStack