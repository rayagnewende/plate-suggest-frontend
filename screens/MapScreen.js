import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";

export default function MapScreen({ navigation }) {
  const [position, setPosition] = useState(null);

  const data = [
    {
      name: "fanfan",
      latitude: 48.86667,
      longitude: 2.333333,
    },
    {
      name: "brutus",
      latitude: 48.872885481682594,
      longitude: 2.2952859364974865,
    },
    {
      name: "restaurant , la capsule , 3 avenue pereire , 600m",
      latitude: 48.87193396429841,
      longitude: 2.3316108714660944,
    },
    {
      name: "Franprix",
      latitude: 48.865064084251976,
      longitude: 2.321269645687196,
    },
    {
      name: "julienne",
      latitude: 48.856424747495474,
      longitude: 2.295248589897114,
    },
    {
      name: "Chez Celine",
      latitude: 48.88742019440718,
      longitude: 2.3032898404706437,
    },
    {
      name: "restauraaaant",
      latitude: 48.8729630135626,
      longitude: 2.3456211577327446,
    },
    {
      name: "encore un restauraaant",
      latitude: 48.84323227507612,
      longitude: 2.3415866370122362,
    },
    {
      name: "Vive la BRETAGNE",
      latitude: 48.8151133,
      longitude: -3.4394662,
    },
    {
      name: "resto pipooo",
      latitude: 48.83965969074901,
      longitude: 2.315517217074148,
    },
  ];

  const markers = data.map((e, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: e.latitude, longitude: e.longitude }}
        title={e.name}
      />
    );
  });

  return (
    <View style={styles.container}>
      <MapView 
      // initialRegion={{
      //   latitude:data[0].latitude,
      //   longitude:data[0].longitude
      // }}
      style={styles.map}>
        <Marker coordinate={{longitude:data[0].longitude, latitude:data[0].latitude }} title={data.name} pinColor="#A41623" />
        {markers}
      </MapView>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: "center",
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: "#ec6e5b",
    borderRadius: 10,
  },
  textButton: {
    color: "#ffffff",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
  },
});
