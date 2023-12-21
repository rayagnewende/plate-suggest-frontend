/*
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";

const { height, width } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const avatarImages = {
    Vegetalien: require("../assets/Vegan.png"),
    Vegetarien: require("../assets/Vegetarien.png"),
    Pescetarien: require("../assets/Pescetarien.png"),
    Flexitarien: require("../assets/Flexitarien.png"),
    Everything: require("../assets/Everything.png"),
  };
  const [regimesModalVisible, setregimesModalVisible] = useState(false);
  const [selectedRegimes, setSelectedRegimes] = useState({
    //Vegetarien: false,
  });
  const [maladieModalVisible, setmaladieModalVisible] = useState(false);
  const [selectedMaladiesParam, setSelectedMaladiesParam] = useState({
   // Obésité: false,
  });
  const [IngredientsModalVisible, setIngredientsModalVisible] = useState(false);
  const [selectedIngredientssParam, setSelectedIngredientssParam] = useState({
    
  });

  const goToPreferencies = () => {
      setregimesModalVisible(!regimesModalVisible);
  };

  const goToIllnesses = () => {
    setmaladieModalVisible(!maladieModalVisible);
  };

  const goToIngredients = () => {
    setIngredientsModalVisible(!IngredientsModalVisible);
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
      
      <View style={styles.parent}>
        <TouchableOpacity  onPress={() => goToPreferencies()} activeOpacity={0.8}>
        
        <Text style={styles.textButton}>Régimes</Text>
        <View style={styles.enligne}>
          <FontAwesome
            name="chevron-right"
            size={20}
            color="black"
          />
          </View>
        </TouchableOpacity>
        </View>
        {regimesModalVisible  && (
          <Modal
              isVisible={regimesModalVisible}
              onBackdropPress={() => setregimesModalVisible(false)}
              style={{
                justifyContent: "flex-end",
                margin: 0,
              }}>

                <View style={styles.regimesModal}>
                <CheckBox
                  title="Vegetarien"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedRegimes.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedRegimes({
                    })
                  }
                />
                <CheckBox
                  title="Végétalien"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.CheckBox}
                  checked={selectedRegimes.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedRegimes({
                    })
                  }
                />
               </View>
               </Modal>
              )}
             <View style={styles.partie2}>
              <View >
                <TouchableOpacity style={styles.maladie} onPress={() => goToIllnesses()} activeOpacity={0.5}>
                <Text style={styles.textButton}>Maladies</Text>
                <FontAwesome name="chevron-right" size={20} color="black" />   
               </TouchableOpacity>
              </View>
              </View>
               {maladieModalVisible && (
               <Modal
               isVisible={maladieModalVisible}
              onBackdropPress={() => setmaladieModalVisible(false)}
              style={{
                justifyContent: "flex-end",
                margin: 0,
              }}>  
                <View style={styles.maladieVisible}>
                <CheckBox
                  title="Obésité"
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
                  title="Diabète"
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
              
       <View style={styles.partie3}>
      <View style={styles.parent2}>
        <TouchableOpacity style={styles.product} onPress={() => goToIngredients()} activeOpacity={0.8}>
        <Text style={styles.textButton}>
            Produits non désiré/Allergène(s)
          </Text>
          <FontAwesome name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </View>
      </View>
      {IngredientsModalVisible && (
               <Modal
               isVisible={IngredientsModalVisible}
              onBackdropPress={() => setIngredientsModalVisible(false)}
              style={{
                justifyContent: "flex-end",
                margin: 0,
              }}>  
                <View style={styles.IngredientsVisible}>
                <TextInput
                  title=""
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.TextInput}
                  checked={selectedIngredientssParam.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedIngredientssParam({
                    })
                  }
                />
                <TextInput
                  title="Diabète"
                  containerStyle={{
                    height: 60,
                    justifyContent: "center",
                    width: 150,
                    alignItems: "center",
                    borderRadius: 50,
                    margin: 10,
                  }}
                  style={styles.TextInput}
                  checked={selectedIngredientssParam.price}
                  checkedColor="#A41623"
                  onPress={() =>
                    setSelectedIngredientssParam({
                    })
                  }
                />
                </View>
              </Modal>
               )}
          
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
    padding: 15,
    flexDirection:'column',
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
  name: {
    marginBottom: 50,
   },
   parent: {
     borderBottomWidth: 2,
     borderBottomColor:"#DFDFDF",
     flexDirection:'row-reverse',

    },
   enligne: {
   
   },
    regime: {

      },
  regimesModal: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "75%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  partie2: {
    borderBottomWidth: 2,
    borderBottomColor:"#DFDFDF",
  },
  textButton: {
    fontSize: 19,
    marginTop: 20,
    fontFamily: "Sansita",
  },
  CheckBox: {
  },
  maladie: {
    justifyContent: "space-around",
   },
  maladieVisible: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "75%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  parent2: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  product: {

  },
  partie3: {
    borderBottomWidth: 2,
    borderBottomColor:"#DFDFDF",
  },
  IngredientsVisible: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "75%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  deconnect: {
    fontSize: 19,
    marginTop: 20,
    fontFamily: "Sansita",
    marginTop: 100,
  },
});
   */
  