import React from 'react'
import { useEffect } from 'react'
import Register from './auth/Register.js'
import TodoList from './todolist/TodoList.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation, route }) {

  const checkJWT = async () => {
    const token = await AsyncStorage.getItem('token')

    if (token && token !== '') {
      navigation.navigate('todolist')
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'tab-profil' }]
      })
    }
  }

  // useEffect ( () => {
  //   const subscriber = auth.onAuthStateChanged( (_user) => {
  //     try {
  //       if (_user !== null) {
  //         console.log("User is authorized") ;
  //         console.log(_user)
  //       } else {
  //         console.log("User should provide credentials") ;
  //       }
  //     } catch(error) {
  //       console.log('Error : ' + error.message) ;
  //     }
  //   })

  //   return () => {
  //     subscriber
  //   }
  // }, [])


  useEffect(() => {
    checkJWT()
    console.log('splash')
  }, [])

  return null
  return <Register />
  return <TodoList route={route} />
}