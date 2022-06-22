import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useTodo from '../../hooks/useTodo'
import { getStorage, ref } from "firebase/storage";

export default function TodoDetail({ navigation, route }) {

  const { task, index, list } = route.params

  if (task.image !== 'https://www.edialog.fr/ged/content/AD5BA6F3-E8E7-4986-A7D8-E6FDFC054D15.jpg') {
    const storage = getStorage()
    ref(storage, `${task.image}`)
  }

  const { deleteTask, checked } = useTodo()

  const removeTask = () => {
    const newList = deleteTask(list, index)
    navigation.navigate('spashscreen', {deleteTask: newList})
  }

  const validTask = () => {
    const newList = checked(task, list, index)
    navigation.navigate('spashscreen', {validTask: newList})
    // console.log('newList', newList)
  }

  const unvalidTask = () => {
    const newList = checked(task, list, index)
    navigation.navigate('spashscreen', {unvalidTask: newList})
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress= {() => navigation.navigate('todolist')}
        style={styles.button}
      >
        <Image source={require('../../../assets/icons/left-arrow.png')} style={styles.icon}/>
        <Text>Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{task.title}</Text>
    
      <View style={styles.imageContainer}>
        <Image 
        style={styles.image}
          source={{
            uri: task.image,
          }}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.subTitle}>Description</Text>
        <Text style={styles.description}>{task.description ? task.description : 'Pas de description'}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.btn, styles.btnRed]} onPress={removeTask}>
          <Text style={styles.btnText}>Supprimer</Text>
        </TouchableOpacity>
        {task.status === 0 ? (
          <TouchableOpacity style={[styles.btn, styles.btnGreen]} onPress={validTask}>
            <Text style={styles.btnText}>Valider</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.btn, styles.btnGreen]} onPress={unvalidTask}>
            <Text style={styles.btnText}>Dévalider</Text>
          </TouchableOpacity>
        )}
       
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode:'stretch',
    marginRight: 5
  },
  title: {
    flex:1,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Fascinate'
  },
  content: {
    flex: 8
  },
  subTitle: {
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  description: {
    fontFamily: 'KdamThmorPro',
    paddingTop: 20
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 100
  },
  btnText: {
    color: 'white',
    fontSize: 16
  },
  btnRed: {
    backgroundColor: 'red'
  },
  btnGreen: {
    backgroundColor: 'green'
  },
  imageContainer: {
    flex: 6
  },
  image: {
    width: '100%',
    height: '100%',
  }
})