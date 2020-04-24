import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native'
import store from '../store/AsyncStorage'

const AddPack = ({ navigation }) => {

	const [packName, setPackName] = useState('')
	const storageKey = "PACKS"

	//speichert den Inhalt des InputFeldes in die PackName variable
	const onChange = textValue => setPackName(textValue)

	// Erstellt neues Pack im Array
	const pushPack = async () => {

		//falls nichts eingegeben wurde
		if(packName == ''){
			alert('Pls enter some value')
		}else{
			try {
				//Alle packs werden aufgerunfen
				store.getData(storageKey).then(res => {
					//in den Aufgerufenen Array wird das neue Pack gepusht
					res.push({
						Id: res.length,
						Pack: packName,
						Wordlist: []
					})
					
					//Die Änderungen werden wieder gespeichert
					store.storeData(storageKey, res)
				})
			} catch (error) {
				console.log(error)
			}
			//Navigiert zurück zum Homescreen
			navigation.goBack()
		}
	}


	return (
		<SafeAreaView style={styles.wrapper}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity 
					onPress={() => { navigation.goBack() }} 
					style={styles.headerBtn}
				>
					<View>
						<Text style={styles.btnText}>Cancle</Text>
					</View>
				</TouchableOpacity>

				<View style={styles.headerTitle}>
					<Text style={styles.headerText}>New Language Pack</Text>
				</View>

				<TouchableOpacity 
					onPress={() => { pushPack() }} 
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
					placeholder="Name of your Pack"
					onChangeText={onChange}
					autoFocus={true}
				/>
			</View>
		</SafeAreaView>
	)
}

export default AddPack

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
		color: "#FEB12C",
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
		alignItems: "center",
		backgroundColor: "#eceff1"
	},

	input:{
		marginTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		height: 40, 
		width: 350,
		borderColor: '#babdbe', 
    borderWidth: 1,
    borderRadius: 10,
		backgroundColor: "white"
	}
})
