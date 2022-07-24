import { View, Text, StyleSheet } from 'react-native'
import {HeaderComponent, MainComponent} from '../components/NoteComponent'
import React from 'react'

const EditNoteScreen = () => {
  return (
    <View style={styles.mainContainer}>
        <HeaderComponent title="Edit" />
        <MainComponent date="date" />
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
    }, 
})

export default EditNoteScreen