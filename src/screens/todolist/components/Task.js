import { View, Text, Pressable, Image, StyleSheet, Share, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Task({ task, index, list, setList }) {

  const navigation = useNavigation();

  let styleLevel

  if (task.level === 0) {
    styleLevel = styles.normal
  } else if (task.level === 1) {
    styleLevel = styles.urgent
  } else {
    styleLevel = styles.useless
  }

  const checked = () => {
    let newStatus = null
    if (task.status === 0) {
      newStatus = 1
    } else {
      newStatus = 0
    }
    const updateTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: newStatus,
      image: task.image,
      level: task.level
    }
    list.splice(index, 1, updateTask)
    setList(list)
  }

  const deleteTask = () => {
    const newList = list.filter(function(item, i) { return i !== index })
    setList(newList)
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
      <Pressable onPress={checked}>
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
        <Pressable onPress={deleteTask} style={{ marginLeft: 10 }}>
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