import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IngredientsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ingredients Screen</Text>
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
