import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function DetailScreen({ navigation }) {
 // const [restaurants, setRestaurants] = useState([]);

  const resto = {
    id: 1,
    name: "Restaurant 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
    qualification: 4.5,
    price: "$$$",
    distance: "0.5 miles",
    image: require("../assets/HotDog.jpg"),
    }

  const goToHome = () => {
    navigation.navigate("Home");
  };



  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity 
      onPress={() => goToHome()}>
      <FontAwesome
      name="arrow-left"
      size={50}
      color="#A41623"
      style={styles.icon}
      />
      </TouchableOpacity>
      </View>
      <Image source={resto.image} style={styles.image}/>
    <View style={styles.bloc1}>
      <Text style={styles.name}>Enseigne : </Text>
      <Text style={styles.description}>Nom du Plat : </Text>
      <Text style={styles.note}>Note: </Text>
      <Text style={styles.price}>Prix: </Text>
      <Text style={styles.distance}>Distance: </Text>
    </View>
    <View style={styles.bloc2}>
      <Text style={styles.name}>{resto.name}</Text>
      <Text style={styles.description}>{resto.description}</Text>
      <Text style={styles.note}>{resto.qualification} </Text>
      <Text style={styles.price}>{resto.price} </Text>
      <Text style={styles.distance}>{resto.distance} </Text>
    </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    fontStyle: "italic",
    
  },
  bloc1: {
    width: '50%',
    height: 100,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'black',
  },
  bloc2: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    borderRadius: 15,
    margin: 10,
    width: "50",
    height: "30%",
  },
  icon: {
   marginBottom: 25,
   margin: 30,
  },
  /*name: {
    fontSize: 20,
    fontStyle: "italic",
    margin: 15,
  },
  description:{
   fontStyle: "italic",
   fontSize: 20,
   margin: 15,
   
  },
  note: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
  },
  price: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
  },
  distance: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
  },*/
 
});
