import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilUser({ navigation }) {

  const userActions = useStoreActions((actions) => actions.user)
  const todoListActions = useStoreActions((actions) => actions.todolist)

  const [token, setToken] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkJWT = async () => {
    const isToken = await AsyncStorage.getItem('token')
    if (isToken && isToken !== '') {
      setToken(isToken)
      console.log('isToken', isToken)
    } else {
      setToken(false)
      navigation.navigate('login')
    }
    setLoading(false)
  }

  useEffect(() => {
    checkJWT()
    console.log('profil')
  }, [])

  const disconnect = async () => {
    userActions.loadUser({})
    todoListActions.resetTodolist()
    await AsyncStorage.removeItem('token')
    setToken(false)
    navigation.reset({
      index: 0,
      routes: [{name: 'tab-todolist'}]
    })
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View>
      <Text>ProfilUser</Text>
      <Text>{token}</Text>
      <TouchableOpacity onPress={disconnect}>
        <Text>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}