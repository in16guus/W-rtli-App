import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddBtn from '../components/AddBtn'
import AddPack from '../screens/AddPack';
import AddRow from '../screens/AddRow'
import Home from '../screens/HomeView';
import WordPackView from '../screens/WordPackView';
import LearnView from '../screens/LearnView'

//Zuständig für das Routing der App
//Navigationsanzeige (Header)

//Erstellen der Instaz
const Stack = createStackNavigator()

const Router = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator>
					{/* Der Erste Stack Screen ist wird als Basis genutzt -> darauf folgende Stacks werden auf 'Home' gestackt  */}
					<Stack.Screen 
						options={({navigation}) => ({
							headerTitle: "Flashcard App", 
							headerStyle: { 
								backgroundColor: "#FEB12C"
							},
							// Component AddPack
							headerRight: () => (
								<AddBtn nav={navigation} location={"AddPack"} color={"white"}/>
							),
						})}
						name="Home" 
						component={Home} 
					/>

					<Stack.Screen 
						options={{
							// Versteckt die Navigationsbar
							header: () => null
						}}
						name="AddPack" 
						component={AddPack} 
					/>

					<Stack.Screen 
						options={{
							// Versteckt die Navigationsbar
							header: () => null
						}}
						name="AddRow" 
						component={AddRow} 
					/>

					<Stack.Screen
						options={({route, navigation}) => ({ 
							// Setzt den Titel in der Navigation auf momentanes Wörtli-Set
							title: route.params.pack.Pack,
							//Component AddRow mit dem angeklickten Pack als prop
							headerRight: () => (
								<AddBtn nav={navigation}  location={"AddRow"} color={"#FEB12C"} pack={route.params.pack}/>
							),
						})}
						name="WordPackView" 
						component={WordPackView}
					/>
					
					<Stack.Screen
						name="LearnView" 
						component={LearnView}
						options={{
							headerTitle: "Learn"
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}

export default Router;

