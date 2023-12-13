import React from "react";
import { View, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import {Dimensions} from 'react-native';
import * as Location from 'expo-location';
import { useEffect } from "react";

export default function MapScreen({ navigation }) {
  
  const [position, setPosition] = useState(null)
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
   
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 16 },
          (location) => {
            setPosition(location.coords);
          });
      }
    })();
   }, [])

  return (
  <View style={styles.container}>
    <MapView style={styles.map} mapType="hybrid">
      
      <Marker> </Marker>
    </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},

});
