import React from 'react'
import { useEffect } from 'react'
import Register from './auth/Register.js'
import TodoList from './todolist/TodoList.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { useStoreActions } from 'easy-peasy';

export default function SplashScreen({ navigation, route }) {

  const userActions = useStoreActions((actions) => actions.user)

  const checkJWT = async () => {
    const token = await AsyncStorage.getItem('token')

    if (token && token !== '') {
      const user = JWT.decode(token, process.env.REACT_APP_TOKEN)
      userActions.loadUser(user)
      navigation.navigate('todolist')
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'tab-profil' }]
      })
    }
  }

  useEffect(() => {
    checkJWT()
    console.log('splash')
  }, [])

  return null
  return <Register />
  return <TodoList route={route} />
}