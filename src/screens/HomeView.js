import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import WordPack from '../components/WordPack';
import store from '../store/AsyncStorage'

// Der 'navigation' Parameter wird durch den Router zur verfügung gestellt
const HomeView = ({ navigation }) => {

  //Variabeln
  const [packs, setPacks] = useState([])
  //LocalStrorage key, für die wiederfindung der gespeicherten Packs
  const keystring = 'PACKS'

  //Re-render function, wenn sich 'store.getData(keystring)' ändert wird der code in useEffect ausgeführt
  useEffect(() => {
    //More Info about 'mounted' var: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
    let mounted = true

    //Bei einer Änderung der gespeicherten Packs, werden die Daten Neu angefordert
    store.getData(keystring).then(res => {
      if(mounted){
        setPacks(res)
      }
    })

    return () => mounted = false
  }, [store.getData(keystring)])
  
  return(
    <View style={styles.wrapper}>
      {/* Liste zur darstellung von allen Packs */}
      <FlatList
        style={styles.list}
        //Anzahl Spalten
        numColumns={2}
        //Aufgelistete Daten
        data={packs}
        //Bei jedem Pack -> füre das aus:
        renderItem={({ item }) => 
          // Component Wordpack mit pack data und navigation prop
					<WordPack nav={navigation} data={item}/>
        }
        //Definition des item keys, (wird von uns nicht gebraucht, jedoch von Flatlist gefordert)
        keyExtractor={item => item.Id}
      />
    </View>
  )
}

export default HomeView;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    flex: 1
  }
})
