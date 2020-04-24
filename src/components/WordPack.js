import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

//Props: Navigation und current Pack Data (von HomeView erhalten)
const WordPack = ({ nav, data }) => {
	
  return(
		<TouchableOpacity 
			style={styles.container} 
			//On Click Navigation zu Seite 'WordPackView', übergabe von dem Pack
			onPress={() => {
				
				// bsp. inhalt von data mit einer Übersetzung: 
				//{"Id": 0, "Pack": "Deutsch", "Wordlist": [{"Id": 0, "Translation": "springen", "Word": "springen"}]}				
				nav.navigate("WordPackView", { pack: data })
			}
		}>
			<View style={styles.item}>
				{/* Folder Icon & Beschriftung, die auf der HomeView angezeigt werden */}
				<FontAwesomeIcon icon={faFolder} size={100} color={'grey'} />
				<Text>{data.Pack}</Text>
			</View>
    </TouchableOpacity>
  )
}

export default WordPack;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	item: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 15,
	}
})
