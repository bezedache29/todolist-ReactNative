import { View, Text, Modal, Alert, Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';

export default function TaskForm({ list, setList, showForm, setShowForm }) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [levelSelect, setLevelSelect] = useState(0)
  const [image, setImage] = useState(null)

  const level = ['Normal', 'Urgent', 'Inutile']

  const handleText = (value) => {
    setTitle(value)
  }

  const hendleDescription = (value) => {
    setDescription(value)
  }

  const addTask = () => {
    const newId = Number(list[list.length - 1].id) + 1
    setList((list) => [...list, {id: newId, title, description, image: image !== null ? image : 'https://www.edialog.fr/ged/content/AD5BA6F3-E8E7-4986-A7D8-E6FDFC054D15.jpg', status: 0, level: levelSelect}])
    setTitle('')
    setShowForm(false)
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const pickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const addImage = () => {
    Alert.alert(
      "Ajouter une image",
      "Choisir la source de votre image",
      [
        {
          text: "Gallery",
          onPress: () => pickImage()
        },
        {
          text: "Camera",
          onPress: () => pickCamera()
        },
      ]
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showForm}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Ajouter une tâche</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleText}
            value={title}
            placeholder="Nom de la tâche"
          />
          <TextInput
            multiline
            numberOfLines={10}
            style={styles.textarea}
            onChangeText={hendleDescription}
            value={description}
            placeholder="Détails de la todo"
          />
          <SelectDropdown
            data={level}
            onSelect={(selectedLevel, index) => {
              setLevelSelect(index)
            }}
            defaultValueByIndex
            buttonStyle={styles.select}
            buttonTextStyle={styles.selectText}
          />
          <Pressable
            style={styles.buttonImage}
            onPress={addImage}
          >
            <Text style={styles.textImage}>Ajouter une image</Text>
          </Pressable>
          <View style={styles.btns}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowForm(!showForm)}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonValid]}
              onPress={addTask}
            >
              <Text style={styles.textStyle}>Valider</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: '80%',
    height: '80%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
    marginRight: 10
  },
  buttonValid: {
    backgroundColor: "#2196F3",
    marginLeft: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold'
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    width: '100%'
  },
  textarea: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    marginTop: 20
  },
  select: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20
  },
  selectText: {
    fontSize: 13,
    color: 'gray'
  },
  buttonImage: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginTop: 20
  },
  textImage: {
    color: 'black',
    textAlign: 'center'
  }
})