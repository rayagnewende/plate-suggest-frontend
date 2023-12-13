import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { useEffect } from "react";

export default function MapScreen({ navigation }) {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapType="hybrid"></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
