import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import CardFlip from 'react-native-card-flip';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const LearnView = ({ route }) => {

  //erhaltene Wörter und Übersetzungen von WordPackView
  const wordlist = route.params

  //wird vom Card-Flip package gebraucht
  const [card, setCard] = useState()
  //setzt das erste Paar (wort & übersetzung) als standardwert 
  const [currentPair, setCurrentPair] = useState([wordlist[0].Word, wordlist[0].Translation])
  //hält die anzahl der übersprungenen karten
  const [count, setCount] = useState(1)
  
  //Beim click auf das Gutzeichen und Das Cancel symbol
  const nextPair = () => {
    //die derzeitigen 2 Wörter werden durch das nächste Paar im wordlist Array ausgetauscht
    //und im currentPair gespeichert
    setCurrentPair([wordlist[count].Word, wordlist[count].Translation])
    //anzahlt durchläufe +1 
    setCount(count + 1)
  }

  //wenn die var count sich ändert wird folgende func ausgeführt:
  useEffect(() => {
    //ist die Anzahl Daruchläufe (count) grösser oder gliech der Anzahl Paare im Array 
    if(count >= wordlist.length){
      //so fängt es wieder beim erstem Paar an
      setCount(0)
    }
  }, [count])

  return (
    <View style={styles.wrapper}>
      {/* WordPanel */}
      <CardFlip 
        style={styles.cardWrapper} 
        ref={data => setCard(data)}
        flipZoom={0.05}
        duration={400}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card1]}
          onPress={() => card.flip()}>
          <Text style={styles.label}>{currentPair[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.card, styles.card2]}
          onPress={() => card.flip()}>
          <Text style={styles.label}>{currentPair[1]}</Text>
        </TouchableOpacity>
      </CardFlip>
      
      {/* Buttons */}
      <View style={styles.btnWrapper}>
        <TouchableOpacity 
					onPress={() => { nextPair() }} 
				>
					<View>
            <FontAwesomeIcon icon={faRedoAlt} size={60} color={'grey'} />
					</View>
				</TouchableOpacity>
        <TouchableOpacity 
					onPress={() => { nextPair() }} 
				>
					<View>
            <FontAwesomeIcon icon={faCheck} size={60} color={'grey'} />
					</View>
				</TouchableOpacity>
      </View>
    </View>
  )
}

export default LearnView;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardWrapper: {
    flex: 3, 
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 470,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
    btnWrapper:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
})
