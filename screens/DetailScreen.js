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

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function DetailScreen({ navigation }) {
  // const [restaurants, setRestaurants] = useState([]);

  const resto = {
    id: 1,
    name: "Restaurant 1",
    NomPlat: "Hot dog",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
    qualification: 4.5,
    price: "$$$",
    distance: "0.5 miles",
    image: require("../assets/HotDog.jpg"),
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => goToHome()}>
          <FontAwesome
            name="arrow-left"
            size={50}
            color="#A41623"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Image source={resto.image} style={styles.image} />
      <View style={styles.container2}>
        <View style={styles.bloc3}>
          <Text style={styles.name}>Enseigne : </Text>
          <Text style={styles.namei}>{resto.name}</Text>
        </View>
        <View style={styles.bloc2}>
          <Text style={styles.PlateName}>Nom du Plat : </Text>
          <Text style={styles.PlateNamei}>{resto.NomPlat}</Text>
        </View>
        <View style={styles.bloc4}>
          <Text style={styles.description}>Description : </Text>
          <Text style={styles.descriptioni}>{resto.description}</Text>
        </View>
        <View style={styles.bloc5}>
          <Text style={styles.note}>Note: </Text>
          <Text style={styles.notei}>{resto.qualification} </Text>
        </View>
        <View style={styles.bloc6}>
          <Text style={styles.price}>Prix: </Text>
          <Text style={styles.pricei}>{resto.price} </Text>
        </View>
        <View style={styles.bloc7}>
          <Text style={styles.distance}>Distance: </Text>
          <Text style={styles.distancei}>{resto.distance} </Text>
        </View>
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
  container2: {
    flex: 1,
    fontStyle: "italic",
  },
  bloc3: {
    flexDirection: "row",
  },
  bloc2: {
    flexDirection: "row",
  },
  bloc4: {
    flexDirection: "row",
  },
  bloc5: {
    flexDirection: "row",
  },
  bloc6: {
    flexDirection: "row",
  },
  bloc7: {
    flexDirection: "row",
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
  name: {
    fontSize: 20,
    fontStyle: "italic",
    margin: 15,
    fontWeight: "bold",
  },
  description: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
  },
  note: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
  },
  price: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
  },
  distance: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
  },
  PlateName: {
    fontStyle: "italic",
    fontSize: 20,
    margin: 15,
    fontWeight: "bold",
  },
  namei: {
    fontSize: 20,
    margin: 15,
  },
  descriptioni: {
    fontSize: 20,
    margin: 15,
  },
  notei: {
    fontSize: 20,
    margin: 15,
  },
  pricei: {
    fontSize: 20,
    margin: 15,
  },
  distancei: {
    fontSize: 20,
    margin: 15,
  },
  PlateNamei: {
    fontSize: 20,
    margin: 15,
  },
});
