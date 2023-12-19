import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { height, width } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

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
    <View style={styles.container}>
      <Text style={styles.parametre}>Paramètres</Text>
      <View style={styles.avatar}>
        <FontAwesome
          name="user"
          size={100}
          color="#A41623"
          style={styles.icon}
        />
      </View>

      <View style={styles.name}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 20,
            fontStyle: "italic",
          }}
        >
          {user.username}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.regime} onPress={() => goToPreferencies()} activeOpacity={0.8}>
        <Text style={styles.textButton}>Régimes</Text>
          <FontAwesome
            name="chevron-right"
            size={20}
            color="black"
            style={styles.autre}
          />
        </TouchableOpacity>
      </View>

      <View >
        <TouchableOpacity style={styles.product} onPress={() => goToIngredients()} activeOpacity={0.8}>
        <Text style={styles.textButton}>
            Produits non désiré/Allergène(s)
          </Text>
          <FontAwesome name="chevron-right" size={20} color="black" />
          
        </TouchableOpacity>
      </View>

      <View >
        <TouchableOpacity style={styles.maladie} onPress={() => goToIllnesses()} activeOpacity={0.5}>
        <Text style={styles.textButton}>Maladies</Text>
          <FontAwesome name="chevron-right" size={20} color="black" />   
        </TouchableOpacity>
      </View>

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
    color: "#645354",
  },
  regime: {
    flexDirection:'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
    paddingBottom: 10,
    paddingTop: 15,
  },
  product: {
    flexDirection:'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
    paddingBottom: 10,
    paddingTop: 15,
  },
  maladie: {
    flexDirection:'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
    paddingBottom: 10,
    paddingTop: 15,
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
  name: {
   marginBottom: 50,
  },
  parametre: {
   fontSize: 30,
   paddingBottom: 15,
   fontWeight: "bold",
  },
});
