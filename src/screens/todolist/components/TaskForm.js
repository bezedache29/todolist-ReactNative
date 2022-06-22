import { View, Text, Modal, Alert, Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../../firebase';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import uuid from 'react-native-uuid';

export default function TaskForm({ list, setAddTodo, showForm, setShowForm }) {

  const storage = getStorage();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [levelSelect, setLevelSelect] = useState(0)
  const [image, setImage] = useState(null)

  const level = ['Normal', 'Urgent', 'Inutile']

  const todolistActions = useStoreActions((actions) => actions.todolist)
  const userStore = useStoreState((state) => state.user)
  const user = userStore.user

  const handleText = (value) => {
    setTitle(value)
  }

  const hendleDescription = (value) => {
    setDescription(value)
  }

  const addTask = async () => {

    if (image) {
      const response = await fetch(image)
      const blob = await response.blob()

      // Renomme et updload l'image sur firebase
      const imageName = uuid.v4() + '.jpg'
      // const imagePath = `gs://todolist-rn-4910c.appspot.com/${imageName}`
      const imagePath = `https://firebasestorage.googleapis.com/v0/b/todolist-rn-4910c.appspot.com/o/images%2F${imageName}?alt=media`
      const imageRef = ref(storage, `images/${imageName}`)
      // const metadata = {
      //   contentType: 'image/jpeg',
      // };
      const snap = await uploadBytes(imageRef, blob)

      // https://firebasestorage.googleapis.com/v0/b/<yourprojectname>.appspot.com/o/users%2F38r174prM9aTx4JAdcm50r3V0Hq2.png?alt=media

      console.log(snap)
    }

    const todo = {
      title,
      description,
      // image: image !== null ? image : 'https://www.edialog.fr/ged/content/AD5BA6F3-E8E7-4986-A7D8-E6FDFC054D15.jpg',
      // image: image !== null ? imageName : 'https://www.edialog.fr/ged/content/AD5BA6F3-E8E7-4986-A7D8-E6FDFC054D15.jpg',
      image: image !== null ? imagePath : 'https://www.edialog.fr/ged/content/AD5BA6F3-E8E7-4986-A7D8-E6FDFC054D15.jpg',
      status: 0,
      level: levelSelect,
      userId: user.uid,
      timestamp: new Date().getTime(),
      createdAt: new Date(),
    }

    try {
      const docRef = await addDoc(collection(db, "todos"), todo);
      console.log("Document written with ID: ", docRef.id);
      setAddTodo(true)
      resetInputs()
      setShowForm(false)
      todolistActions.addTodo(todo)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const resetInputs = () => {
    setTitle('')
    setDescription('')
    setLevelSelect(0)
    setImage(null)
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