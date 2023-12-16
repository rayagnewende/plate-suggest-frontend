import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const goToPreferencies = () => {
    navigation.navigate("Preferencies");
  };

  const goToIllnesses = () => {
    navigation.navigate("Illnesses");
  };

  const goToIngredients = () => {
    navigation.navigate("Ingredients");
  };

  const [isConnected, setIsconected] = useState(false);
  const dispatch = useDispatch();

  const handledisconnect = () => {
    dispatch(logout());
    setIsconected(true);
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <FontAwesome
          name="user"
          size={100}
          color="#A41623"
          style={styles.icon}
        />
      </View>
      <Text style={{textAlign:"center", marginTop:10, fontSize:20, fontStyle:"italic"}}>{user.username}</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Mes préférences</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goToIngredients()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Produits non désiré/Allergène(s)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goToIllnesses()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Maladies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handledisconnect()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.deconnect}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 15,
  },
  textButton: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 60,
  },
  deconnect: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 200,
  },
  icon: {
    textAlign: "center",
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
  },
  avatar: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
