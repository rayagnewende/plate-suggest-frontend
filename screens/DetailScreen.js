import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function DetailScreen({ route, navigation }) {
  // const [restaurants, setRestaurants] = useState([]);
  const { restaurant } = route.params;
  const resto = {
    id: 1,
    name: "Restaurant 1",
    NomPlat: "Hot dog",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nibh nisl. Sed pharetra nunc massa, eu vulputate dui rutrum vel. Pellentesque elementum suscipit rhoncus.",
    qualification: 4.5,
    price: "$$$",
    distance: "0.5 miles",
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.bloc2} onPress={() => goToHome()}>
          <FontAwesome
            name="arrow-left"
            size={45}
            color="#A41623"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: restaurant.dish_image }} style={styles.image} />

      <View style={styles.container2}>
        <View style={styles.bloc3}>
          <FontAwesome
            name="home"
            size={20}
            color="#A41623"
            style={styles.icon}
          />
          <Text style={styles.namei}>FanFan</Text>
        </View>
        <View style={styles.container3}>
          <View style={styles.bloc4}>
          <FontAwesome
            name="star-o"
            size={20}
            color="#A41623"
            style={styles.icon}
          />
          <Text > 3,8 </Text>
          </View>
          <View style={styles.bloc4}>
           <FontAwesome
            name="euro"
            size={20}
            color="#A41623"
            style={styles.icon}
          />
          <Text > 12 </Text>
          </View>
          <View style={styles.bloc4}>
          <FontAwesome
            name="road"
            size={20}
            color="#A41623"
            style={styles.icon}
          />
          <Text > 600 mètres </Text>
          </View>
         </View>
        </View>

        <View style={styles.bloc5}>
          <Text style={styles.PlateNamei}>{restaurant.dish_name}</Text>
        </View>
        <View style={styles.bloc}>
          <Text style={styles.description}></Text>
          <Text style={styles.descriptioni}>{restaurant.dish_description}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    fontStyle: "italic",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container3: {
    fontStyle: "italic",
    flexDirection: "column",
  
  },
  bloc2: {
    flexDirection: "row",
    marginTop: 30,
  },
  bloc3: {
    flexDirection: "row",
    paddingTop: 30,
  },
  bloc4: {
    flexDirection: "row",
    paddingTop: 15,
  },
  bloc5: {
    paddingTop: 15,
  },
  bloc6: {
    paddingTop: 15,
  },
  image: {
    borderRadius: 15,
    height: "50%",
  },
  icon: {
    marginLeft:15,
  },
  name: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  description: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "bold",
  },
  distance: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "bold",
  },
  PlateName: {
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "bold",
  },
  namei: {
    fontSize: 20,
    fontStyle: "italic", 
    paddingLeft: 10,
  },
  descriptioni: {
    fontSize: 16,
    marginStart: 10,
  },
  notei: {
    fontSize: 16,
  },
  pricei: {
    fontSize: 16,
  },
  distancei: {
    fontSize: 16,
  },
  PlateNamei: {
    fontSize: 16,
    color: "#A41623",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    fontStyle: "italic",
  },
});
