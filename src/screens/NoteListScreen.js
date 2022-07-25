import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Icon} from 'react-native-elements'
import realm from '../../store/realm'

const NoteListScreen = (props) => {
  const {navigation} = props;
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    const noteListPage = navigation.addListener('focus', () => {
      const notes = realm.objects('Note')
      const notesByDate = notes.sorted('date', true)
      setData(notesByDate)
      setSearchText('')
    })
    return noteListPage;
  }, [])

  const dateFormat = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const noteDate = new Date(date)
    const dateOnly = noteDate.getDate()
    const monthOnly = noteDate.getMonth()
    const yearOnly = noteDate.getFullYear()

    return months[monthOnly] + ` ` + dateOnly + ', ' + yearOnly
  }

  const searchData = (value) => {
    const dataFromDatabase = realm.objects('Note').sorted('date', true)
    const searchedData = dataFromDatabase.filter((item) => {
      const itemData = item.note.toLowerCase()
      const valueData = value.toLowerCase()
      return itemData.indexOf(valueData) > -1
    })
    setData(searchedData)
    setSearchText(value)
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notes</Text>
      </View>
      <FlatList contentContainerStyle={styles.flatListContainer} data={data} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} renderItem={({item}) => {
        return(
          <View style={styles.mainDataContainer}>
            <TouchableOpacity style={styles.noteButton} onPress={() => navigation.navigate("EditNote", {id : item.id})}>
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{item.note}</Text>
              </View>
              <Text style={styles.dateText}>
                {dateFormat(item.date)}
              </Text>
            </TouchableOpacity>
          </View>
        )
      }} 
      ListHeaderComponent = {
        <View style={styles.searchBox}>
          <Icon name="search" type="font-awesome" size={18} style={styles.searchIcon} color="grey" />
          <TextInput placeholder="Search here" style={styles.searchInput}
          onChangeText={(text) => searchData(text) }
          value={searchText}
          />
        </View>
      }
      keyboardShouldPersistTaps={'handled'}
      ListEmptyComponent={
        <View style={{alignItems: 'center', margin: 8}}>
          <Text>
            No Items 
          </Text>
        </View>
      }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateNote')} >
          <Icon name="plus" type="antdesign" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer : {
    flex : 1,
    backgroundColor: 'white'
  }, headerContainer : {
    padding: 18,
    backgroundColor: 'moccasin',
    justifyContent : 'center',
    alignItems : 'center'
  }, headerTitle : {
    fontSize: 20,
    padding: 8,
    fontWeight: 'bold'
  }, buttonContainer : {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }, addButton : {
    backgroundColor : 'pink',
    padding: 16,
    borderRadius : 100
  }, flatListContainer : {
    padding: 8
  }, mainDataContainer : {
    margin: 8,
    backgroundColor: 'whitesmoke',
    borderRadius : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, noteButton : {
    flex : 1,
    padding: 8,
    margin: 8
  }, noteContainer : {
    maxHeight : 40,
    padding: 10
  }, noteText: {
    textAlign: 'justify',
    color : 'black',
  }, dateText : {
    fontSize : 12
  }, searchBox : {
    flexDirection: 'row',
    borderWidth : 1,
    margin: 8,
    borderRadius : 10,
    flex : 1,
    alignItems : 'center'
  }, searchIcon : {
    padding: 8,
    paddingRight : 0
  }, searchInput : {
    height: 30,
    padding: 8,
    flex : 1
  }
})

export default NoteListScreen