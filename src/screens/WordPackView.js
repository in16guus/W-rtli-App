import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import store from '../store/AsyncStorage'

const WordPackView = ({ route, navigation }) => {

	//Data von HomeView (origin: HomeView) Path: HomeView -> WordPack -> WordPackView (Hier)
	const { pack } = route.params
	const [data, setData] = useState([])
	const keystring = 'PACKS'

	//Hier werden wieder die Packs aufgerufen (inifizient, bessere lösung mit DB)
	//Aufgerufen werden die Packs wieder bei einer änderung im LocalStorage, dies ermöglicht das HotReload nach dem erstellen einer neuer Übersetzung
	useEffect(() => {
		let mounted = true

    store.getData(keystring).then(res => {
			if(mounted){
				//anhand der packID wird das benötigte Pack zwischengespeichert
				setData(res[pack.Id])
			}
		})

		return () => mounted = false
	}, [store.getData(keystring)])
	
	//on Click wird man wieter zum LearnView weitergeleitet
	//als parameter werden alle Übersetzungen in einerm Array weitergereicht bsp:
	// [{"Id": 0, "Translation": "springen", "Word": "springen"}, {"Id": 1, "Translation": "Singen", "Word": "Singen"}]
	const goToLearnView = () => {	
		if(data.Wordlist.length != 0){
			navigation.navigate("LearnView", data.Wordlist)
		}else{
			//falls keine Übersetzungen existieren 
			alert('No words to learn!')
		}
	}


	return (
		<View style={styles.wrapper}>
			{/* Wordlist */}
			<View style={styles.Wordlist}>
				<FlatList
					data={data.Wordlist}
					renderItem={({ item }) =>
						<View style={styles.list}>
							<View style={styles.listCell}>
								<Text style={styles.cellText}>{item.Word}</Text>	
							</View >
							<View style={styles.listCell}>
								<Text style={styles.cellText}>{item.Translation}</Text>	
							</View>
						</View>
					}
					keyExtractor = { (item, index) => index.toString() }
				/>
			</View>

			{/* Start Learning Button */}
			<View style={styles.btnWrapper}>
				<TouchableOpacity 
					onPress={() => {
						goToLearnView()
					}} 
					style={styles.btn}
				>
					<View>
						<Text style={styles.btnText}>Start Learning</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default WordPackView

const styles = StyleSheet.create({
	wrapper:{
		flex: 1
	},

	Wordlist:{
		flex: 7,
		alignItems: "center",
		alignItems: "stretch",
		padding: 20
	},

	list:{
		flex: 1,
		justifyContent: "space-around",
		flexDirection: "row",
	},

	listCell:{
		flex: 1,
		borderBottomWidth: 1,
		borderColor: "grey"
	},

	cellText:{
		textAlign: "center",
		fontSize: 20,
		paddingVertical: 10
	},

	btnWrapper:{
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 20,
		borderTopWidth: 1,
		borderColor: "grey",
	},
	btn:{
		width: 200,
		height: 50,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		backgroundColor: "#FEB12C",
	},
	btnText:{
		fontSize: 15
	}
})


