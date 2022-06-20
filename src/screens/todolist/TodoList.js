import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Alert, TouchableHighlight } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Task from './components/Task'
import Compteur from './components/Compteur'
import TaskForm from './components/TaskForm'
import { useStoreActions, useStoreState } from 'easy-peasy'

export default function TodoList({ navigation, route }) {

  const [list, setList] = useState([])
  const todolistActions = useStoreActions((actions) => actions.todolist) // Action Todolist
  const todolistStore = useStoreState((state) => state.todolist) // Store Todolist
  const todolist = todolistStore.todolist // Tableau todolist dans store todolist

  const [showForm, setShowForm] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [addTodo, setAddTodo] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setList(todolist)
  }, [])

  useEffect(() => {
    if (addTodo || reload) {
      setList(todolist)
      setAddTodo(false)
      setReload(false)
    }
  }, [addTodo, reload])

  const openForm = () => {
    setShowForm(!showForm)
  }

  const renderItem = ({ item, index }) => {
    return <Task task={item} index={index} list={[...list]} setList={setList} />
  }

  // Reset List
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      todolistActions.resetTodolist()
      setReload(true)
      setRefreshing(false)
    }, 2000)
  })

  useEffect(() => {
    if (route.params && route.params.deleteTask) {
      setList(route.params.deleteTask)
      Alert.alert(
        "Todo Supprimée !",
        "Votre tâche a bien été supprimée",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (route.params && route.params.validTask) {
      setList(route.params.validTask)
      Alert.alert(
        "Todo Validée !",
        "Votre tâche a bien été validée",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if (route.params && route.params.unvalidTask) {
      setList(route.params.unvalidTask)
      Alert.alert(
        "Todo Dévalidée !",
        "Votre tâche a bien été dévalidée",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    }
  }, [route.params])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList 
        ListHeaderComponent={
          <>
            <View style={styles.containerHeader}>
              <Text style={styles.titleHeader}>Ma Todo List</Text>
            </View>
            {showForm && <TaskForm list={list} setAddTodo={setAddTodo} showForm={showForm} setShowForm={setShowForm} />}
            <View style={styles.containerCpts}>
              <Compteur position={'left'} title={'Total tâches'} nb={list.length} />
              <Compteur position={'right'} title={'Tâches réalisées'} nb={list.filter(task => task.status === 1).length} />
            </View>
          </>
          
        }
        contentContainerStyle={{ flexGrow: 1 }}
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={openForm}
      >
        <Text style={styles.addBtnText}>
          {showForm ? '-' : '+'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    paddingLeft: 25,
    paddingTop: 20
  },
  titleHeader: {
    fontSize: 22,
    fontFamily: 'Fascinate'
  },
  addBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width:50,
    height:50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor:'blue',
    borderRadius: 80,
    paddingBottom: 3
  },
  addBtnText: {
    color: 'white',
    fontSize: 30
  },
  containerCpts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
})