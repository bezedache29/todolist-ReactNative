import React from 'react'
import { useEffect } from 'react'
import Register from './auth/Register.js'
import TodoList from './todolist/TodoList.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';
import { auth } from '../../firebase.js';
import { useStoreActions } from 'easy-peasy';

export default function SplashScreen({ navigation, route }) {

  const userActions = useStoreActions((actions) => actions.user)

  const checkJWT = async () => {
    const token = await AsyncStorage.getItem('token')

    if (token && token !== '') {
      // navigation.navigate('todolist')
      // const tokenDecoded = JWT.decode(token, process.env.REACT_APP_TOKEN)
      // console.log(tokenDecoded.user.id)

      // const user = await auth.getUser(tokenDecoded.user.id)
      // console.log(`Successfully fetched user data: ${user.toJSON()}`)

      auth.onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          console.log(user);
          userActions.loadUser(user)
          navigation.navigate('todolist')
        } else {
          // User not logged in or has just logged out.
          navigation.reset({
            index: 0,
            routes: [{name: 'tab-profil'}]
          })
        }
      })
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