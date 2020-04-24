import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native'
import store from '../store/AsyncStorage'

const AddRow = ({ navigation, route }) => {
	// route = ist notwendig um auf die weitergeleiteten Parameter zuzugreiffen
	// navigation = wird vom Router erteilt

	//Das Pack dass vom addBtn weitergeleitet wurde
  const pack = route.params

	const [word, setWord] = useState('')
	const [trans, setTrans] = useState('')
	const storageKey = "PACKS"

	// erfassung der Inputfelder im den entsprechende Variabeln
	const onChangeWord = textValue => setWord(textValue)
	const onChangeTrans = textValue => setTrans(textValue)


	const pushRow = () => {

		// Falls ein oder beide Felder leer sind
		if(word == '' || trans == ''){
			alert('Pls fill out both fields')
		}else{
			try {
				// Alle Packs werden aufgerufen
				store.getData(storageKey).then(res => {
					
					// Das über den addBtn erhaötene Pack wird befüllt
					pack.Wordlist.push({
						Id: pack.Wordlist.length,
						Word: word,
						Translation: trans
					})
					
					// Anhand der überreichten Pack.id aus dem Pack, wird bestimmt wo im Array von Packs (res), das Set gespeichert werden muss
					res[pack.Id] = pack
					
					// Updated Packs werden gespeichert
					store.storeData(storageKey, res)
				})
			} catch (error) {
				console.log(error)
			}
			// Zurück zu WordPackView
			navigation.goBack()
		}
	}


	return (
    <SafeAreaView style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
            onPress={() => {
              navigation.goBack()
            }} 
            style={styles.headerBtn}
          >
            <View>
              <Text style={styles.btnText}>Cancle</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerTitle}>
            <Text style={styles.headerText}>Add A New Pair</Text>
          </View>

          <TouchableOpacity 
            onPress={() => {
              pushRow()
            }} 
            style={styles.headerBtn}
          >
            <View>
              <Text style={styles.btnText}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>

      {/* Content */}
      <View style={styles.content}>
        <TextInput 
          style={styles.input}
          placeholder="Word"
          onChangeText={onChangeWord}
          autoFocus={true}
        />
        <TextInput 
          style={styles.input}
          placeholder="Translation"
          onChangeText={onChangeTrans}
        />
      </View>
    </SafeAreaView>
	)
}

export default AddRow

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	},
	
	btn:{
		padding: 10,
	},

	headerBtn: {
		width: 60,
		alignItems: "center",
		justifyContent: "center",

	},

	btnText:{
		color: "orange",
		fontSize: 15
	},

	headerTitle: {
		fontWeight: "bold",
		alignItems: "center",
		justifyContent: "center",
	},
	
	headerText:{
		fontSize: 18,
		fontWeight: "bold"
	},

	header: {
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",

		borderColor: "#babdbe",
		borderBottomWidth: 0.5
	},

	content:{
		flex: 1,
    backgroundColor: "#eceff1",
    alignItems: "center"
	},

	input:{
		marginTop: 15,
		paddingLeft: 15,
    paddingRight: 15,
    width: 200,
    height: 40,
		borderColor: '#babdbe', 
    borderWidth: 1,
    borderRadius: 10,
		backgroundColor: "white"
	}
})
