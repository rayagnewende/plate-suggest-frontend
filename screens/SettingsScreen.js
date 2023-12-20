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
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";

const { height, width } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [regimesModalVisible, setregimesModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
  });
  const [maladieModalVisible, setmaladieModalVisible] = useState(false);
  const [selectedMaladiesParam, setSelectedMaladiesParam] = useState({
  });
  const [IngredientsModalVisible, setIngredientsModalVisible] = useState(false);
  const [selectedIngredientssParam, setSelectedIngredientssParam] = useState({
  });


  const goToPreferencies = () => {
      setregimesModalVisible(!regimesModalVisible);
  };

  const goToIllnesses = () => {
    navigation.navigate(!maladieModalVisible);
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

  const renderOption = (option) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleOptionSelect(option)}
      key={option}
    >
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={option === selectedOption}
          onPress={() => handleOptionSelect(option)}
          style={styles.checkbox}
          checkedColor="#A41623"
        />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{option.padEnd(20)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        {regimesModalVisible && maladieModalVisible && (
          <Modal
              isVisible={regimesModalVisible}
              onBackdropPress={() => setregimesModalVisible(false)}
              style={{
                justifyContent: "flex-end",
                margin: 0,
              }}>
                <View style={styles.regimesModal}>
                <CheckBox
                  title="Prix"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedFilters.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedRegimes({
                    })
                  }
                />
                <CheckBox
                  title="Prix"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedFilters.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedRegimes({
                    })
                  }
                />
               
                </View>
                <View style={styles.maladieModalVisible}>
                <CheckBox
                  title="Prix"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedMaladiesParam.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedMaladiesParam({
                    })
                  }
                />
                <CheckBox
                  title="Prix"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedMaladiesParam.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedMaladiesParam({
                    })
                  }
                />
                </View>
                
          </Modal>
       )}

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
  divLogo: {
    backgroundColor: "#A41623",
    height: 120,
    margin: 0,
    borderBottomRightRadius: 120,
    borderBottomLeftRadius: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  filterDropdown: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "50%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
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
