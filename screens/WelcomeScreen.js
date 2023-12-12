import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useState } from "react";

export default function WelcomeScreen({ navigation}) {

  const [isConnected, setIsconected] = useState(false)  
  const dispatch = useDispatch(); 

  const handledisconnect = () => {
    
     dispatch(logout())
     setIsconected(true); 
     navigation.navigate("Home"); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <TouchableOpacity 
       onPress={() => handledisconnect() } >
        <Text>Se déconnecter</Text>
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
});
