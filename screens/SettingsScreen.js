import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";


export default function SettingsScreen({ navigation }) {
  
  const goToPreferencies = () => {
    navigation.navigate("Preferencies");
  }

  const goToIllnesses = () => {
    navigation.navigate("Illnesses");
  }

  const goToIngredients = () => {
    navigation.navigate("Ingredients");
  }

  const [isConnected, setIsconected] = useState(false)  
  const dispatch = useDispatch(); 

  const handledisconnect = () => {
    
     dispatch(logout())
     setIsconected(true); 
     navigation.navigate("Home"); 
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => goToPreferencies()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Mes préférences</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goToIngredients()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Produits non désiré/Allergène(s)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goToIllnesses()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Maladies</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => handledisconnect()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Déconnexion</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    fontSize: 16,
  }
});
