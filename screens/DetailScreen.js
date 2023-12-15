import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function DetailScreen({ route }) {
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Image source={restaurant.image} />
      <Text style={styles.text}>Name :{restaurant.name}</Text>
      <Text style={styles.text}>Description :{restaurant.description}</Text>
      <Text style={styles.text}>Note :{restaurant.qualification}</Text>
      <Text style={styles.text}>Price :{restaurant.price}</Text>
      <Text style={styles.text}>Distance :{restaurant.distance}</Text>
    </View>
  );
}
o
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
