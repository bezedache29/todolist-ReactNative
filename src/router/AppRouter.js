import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from '../screens/todolist/TodoList';
import SplashScreen from '../screens/SplashScreen';
import TodoDetail from '../screens/tododetail/TodoDetail';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="spashscreen" headerMode="None" mode="modal" screenOptions={{headerShown: false}}>
        <Stack.Screen name="spashscreen" component={SplashScreen} />
        <Stack.Screen name="todolist" component={TodoList} />
        <Stack.Screen name="tododetail" component={TodoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}