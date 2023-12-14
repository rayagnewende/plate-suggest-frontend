import React, { useState, useEffect } from "react";
import {  View, StyleSheet,  Text, TouchableOpacity, } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from 'react-redux';

export default function MapScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

   const [newPlace, setNewPlace] = useState('');
   const [tempCoordinates, setTempCoordinates] = useState(null);
   const [position, setPosition] = useState(null)

  const data = [
  {
    name:"Fanfan", 
    latitude: 48.520001, 
    longitude: 2.333333,
  }
 ]
  const handleLongPress = (e) => {
  setTempCoordinates(e.nativeEvent.coordinate);
  setModalVisible(true);
  };


   const markers = data.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />
   })

  return (
    <View style={styles.container}>
      <MapView onLongPress={(e) => handleLongPress(e)} style={styles.map} mapType="hybrid">
         <Marker coordinate={position} name={ setPosition } pinColor="#fecb2d" />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
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
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
