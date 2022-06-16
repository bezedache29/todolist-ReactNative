import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Compteur({ title, nb, position }) {
  return (
    <View style={styles.container}>
      <Text style={position === 'left' ? styles.nbRight : styles.nbLeft }>{nb}</Text>
      <Text style={position === 'left' ? styles.titleRight : styles.titleLeft}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '40%'
  },
  titleLeft: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 'auto'
  },
  nbLeft: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 'auto'
  },
  titleRight: {
    fontSize: 16,
    color: 'grey',
  },
  nbRight: {
    fontWeight: 'bold',
    fontSize: 20,
  }
})