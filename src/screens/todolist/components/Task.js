import { View, Text, Pressable, Image, StyleSheet, Share, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import useTodo from '../../../hooks/useTodo';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../../../firebase';
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function Task({ task, index, list, setList, setDeleted }) {

  const storage = getStorage();

  const navigation = useNavigation();
  const { checked, deleteTask } = useTodo()

  let styleLevel

  if (task.level === 0) {
    styleLevel = styles.normal
  } else if (task.level === 1) {
    styleLevel = styles.urgent
  } else {
    styleLevel = styles.useless
  }

  const valid = () => {
    const newList = checked(task, list, index)
    setList(newList)
  }

  const removeTask = async () => {
    // const newList = deleteTask(list, index)
    // setList(newList)

    if (task.imageName !== 'default') {
      const desertRef = ref(storage, `images/${task.imageName}`);
      await deleteObject(desertRef)
    }

    await deleteDoc(doc(db, "todos", task.docId));
    setDeleted(true)
  }

  const detail = () => {
    navigation.navigate('tododetail', {task, index, list})
  }

  const share = async () => {
    try {
      const result = await Share.share({
        message: task.title,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('shared with activity type of result.activityType')
        } else {
          // shared
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed')
      }
    } catch (error) {
      Alert.alert(
        "Erreur partage",
        error.message,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={valid}>
        <View style={styles.subContainer}>
          <Image 
            style={styles.icon}
            source={task.status === 1 
                      ? require('../../../../assets/icons/check-mark.png')  
                      : require('../../../../assets/icons/circle.png')}
          />
          <Text style={[task.status === 1 ? styles.titleCompleted : styles.title, styleLevel, styles.styleFont]}>{task.title}</Text>
        </View>
      </Pressable>
      <View style={styles.btns}>
        <Pressable onPress={share} style={{ marginRight: 10 }}>
          <Image 
            style={styles.icon}
            source={require('../../../../assets/icons/share.png')}
          />
        </Pressable>
        <Pressable onPress={detail} style={{ marginRight: 10, marginLeft: 10 }}>
          <Image 
            style={styles.icon}
            source={require('../../../../assets/icons/detail.png')}
          />
        </Pressable>
        <Pressable onPress={removeTask} style={{ marginLeft: 10 }}>
          <Image 
            style={styles.icon}
            source={require('../../../../assets/icons/trash.png')}
          />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
  },
  titleCompleted: {
    marginLeft: 10,
    fontStyle: 'italic',
    color: 'gray',
    textDecorationLine: 'line-through'
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    width: 23,
    height: 23,
  },
  normal: {
    color: 'blue',
    fontSize: 18
  },
  urgent: {
    color: 'red',
    fontSize: 18
  },
  useless: {
    color: 'gray',
    fontSize: 18
  },
  styleFont: {
    fontFamily: 'KdamThmorPro'
  }
})