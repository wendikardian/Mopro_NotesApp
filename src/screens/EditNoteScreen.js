import { View, Text, StyleSheet } from 'react-native'
import {HeaderComponent, MainComponent} from '../components/NoteComponent'
import React, {useEffect, useState} from 'react'
import realm from '../../store/realm'

const EditNoteScreen = (props) => {
    const {route, navigation} = props;
    const id = route.params.id
    const [dataToUpdate, setDataToUpdate] = useState([])
    useEffect(()=> {
        const data = realm.objects('Note').filtered(`id = ${id}`)
        setDataToUpdate(data)
    }, [])
    useEffect(() => {
        console.log("Edit Screen")
        console.log(dataToUpdate)
    }, [dataToUpdate])
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