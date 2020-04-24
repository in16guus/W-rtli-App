import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddBtn = ({nav, location, color, pack}) => {
	// nav = ermöglich das navigieren zu anderen Stacks im router
	// location = Da der Button 2x gebraucht wird, muss man spezifizieren welche View dass er durch den router aufrufen soll
	// 						In der HomeView navigiert der AddBtn zur AddPack - View & in der WordPackView navigiert der Button zur AddRow - View
	// color = die Farbe des Buttons
	// pack = wird nur beim aufrufen von AddRow benötigt, gibt das aktuelle Pack weiter.
	// 				Durch das weitergegebene Pack weiss das Programm wo die Wörter zu speichern sind

  return (
	  
    <View>
      <TouchableOpacity 
				onPress={() => {
					nav.navigate(location, pack)
				}} 
				style={styles.btn}
			>
				<View>
					<FontAwesomeIcon icon={faPlus} size={30} color={color} />
				</View>
			</TouchableOpacity>
    </View>
  )
}

export default AddBtn

const styles = StyleSheet.create({
	btn:{
		padding: 10,
	},
})
