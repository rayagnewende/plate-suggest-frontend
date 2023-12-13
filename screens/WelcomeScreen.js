import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useState } from "react";


export default function WelcomeScreen({ navigation}) {

  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      
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
