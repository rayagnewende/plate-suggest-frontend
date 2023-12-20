import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";

export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const avatarImages = {
    Vegetalien: require("../assets/Vegan.png"),
    Vegetarien: require("../assets/Vegetarien.png"),
    Pescetarien: require("../assets/Pescetarien.png"),
    Flexitarien: require("../assets/Flexitarien.png"),
    Everything: require("../assets/Everything.png"),
  };

  const goToPreferencies = () => {
    navigation.navigate("Preferences");
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.icon}>
        <Image
          style={styles.img}
          source={
            avatarImages[user.preferences.regime] || avatarImages.Everything
          }
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          fontSize: 30,
         
          letterSpacing: 2,
          color: "#A64123",
          fontFamily: "SansitaBold",
        }}
      >
        {user.username}
      </Text>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    padding: 15,
  },
  textButton: {
    fontSize: 19,
    // fontWeight: "bold",
    marginTop: 20,
    fontFamily: "Sansita",
  },
  deconnect: {
    fontSize: 19,
    // fontWeight: "bold",
    marginTop: 20,
    fontFamily: "Sansita",
  },
  icon: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  img: {
    height: 180,
    width: 180,
    borderRadius: 100,
  },
});
