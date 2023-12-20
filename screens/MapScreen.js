import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Dimensions } from "react-native";

const MarkerDescription = (imageUrl, name, adresse, distance) => {
  return (
    <Callout tooltip>
      <View style={styles.callout}>
        <Image
          source={{
            uri: imageUrl,
          }}
          resizeMode="cover"
          style={{ width: 100, height: "100%" }}
        ></Image>
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {name}
          </Text>
          <Text>{adresse}</Text>
          <Text>{distance}</Text>
        </View>
      </View>
    </Callout>
  );
};

export default function MapScreen({ navigation }) {
  const [position, setPosition] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("https://plate-suggest-backend.vercel.app/places")
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.places);
        //console.log(data.places[0].place_name);
      });
  }, []);

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

  const markers = places.map((e, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: e.latitude, longitude: e.longitude }}
      >
        <Callout tooltip>
          <View style={styles.callout}>
            <Image
              source={{ uri: e.place_image }}
              style={{
                width: Dimensions.get("window").width * 0.4,
                height: "100%",
              }}
            />
            <View style={{ margin: 5 }}>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Name:</Text>
                <Text style={{ fontWeight: "700", fontSize: 15 }}>
                  {e.place_name}
                </Text>
              </View>
              <View style={{ margin: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Adresse :
                </Text>
                <Text style={{ fontWeight: "700", fontSize: 15 }}>
                  {e.adresse}
                </Text>
              </View>
              <View style={{ margin: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Distance :{" "}
                </Text>
                <Text style={{ fontWeight: "700", fontSize: 15 }}>
                  {e.distance} m
                </Text>
              </View>
            </View>
          </View>
        </Callout>
      </Marker>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 48.88774463665781,
          longitude: 2.3038443429644446,
          latitudeDelta: 0.094,
          longitudeDelta: 0.06,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            longitude: 2.3038443429644446,
            latitude: 48.88774463665781,
          }}
          title={data.name}
          pinColor="#fecb2d"
        />
        {markers}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  callout: {
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.2,
    flexDirection: "row",
    borderWidth: 2,
    padding: 5,
    borderRadius: 12,
    overflow: "hidden",
  },
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
