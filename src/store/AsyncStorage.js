import AsyncStorage from '@react-native-community/async-storage';

// Managed Speicher- und Abruffunktionen vom LocalStorage
export default{
 
  // Ruft alle Daten ab die uter einem bestimmten 'key' geschpeichert sind
  async getData(key) {
		try {
      let value = await AsyncStorage.getItem(key)
      //falls keine daten eingertage
      if(value == null){
        //wird ein leerer array zurückgegeben
        value = []
        return value
      }
      // falls Daten vorhanden, werden diese in ein Array umgewandelt und weitergeschickt
      // (Daten im LocalStorage werden als String gespeichert, deshalb die umwandlung zum Array)
      return JSON.parse(value)
		} catch (error) {
			console.log("Error when trying to read from local storage:", error)
    }
  },

  // Daten speichern, benötigt die zu speichernden daten und den key als prop
  // der Key aggiert hier als eine art 'locator', vergleichbar mit dem table-name in einer DB
  async storeData(key, data) {
		try {
      //Übergebene Daten werden zu einem string umgewandelt und im Localstorage gespeichert
			await AsyncStorage.setItem(key, JSON.stringify(data))
		} catch (error) {

			console.log("Error when trying to write to local storage:", error)
    }
  },
  
  // Ausschliesslich fürs development
  // Löscht den gesamten Localstrorage der App
  // Für den gebrauch: AsyncStorage.delete() in das HomeView einfügen, app refreshen, und wieder entfernen
  async delete(){
    await AsyncStorage.clear()
  }

}
