

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/auth/Register'
import Login from '../screens/auth/Login'
import ProfilUser from '../screens/profil/ProfilUser'


const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="profil" headerMode="None" mode="modal" screenOptions={{headerShown: false}}>
      <Stack.Screen name="profil" component={ProfilUser} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack