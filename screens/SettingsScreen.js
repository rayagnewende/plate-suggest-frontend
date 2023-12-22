import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectRegime,
  addIngredient,
  deleteIngredient,
  deleteIllness,
  addIllnesses,
} from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";

const { height, width } = Dimensions.get("window");

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const avatarImages = {
    Végétalien: require("../assets/Vegan.png"),
    Végétarien: require("../assets/Vegetarien.png"),
    Pescétarien: require("../assets/Pescetarien.png"),
    Flexitarien: require("../assets/Flexitarien.png"),
    Everything: require("../assets/Everything.png"),
  };
  const [regimesModalVisible, setregimesModalVisible] = useState(false);
  const [selectedRegimes, setSelectedRegimes] = useState(
    user.preferences.regime
  );
  const [maladieModalVisible, setmaladieModalVisible] = useState(false);
  const [selectedIllnesses, setSelectedIllnesses] = useState([
    ...user.preferences.illnesses,
  ]);
  const [ingredientsModalVisible, setIngredientsModalVisible] = useState(false);
  const [newWord, setNewWord] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([
    ...user.preferences.ingredients,
  ]);
  const [diabeteChecked, setDiabeteChecked] = useState(false);
  const [obesiteChecked, setObesiteChecked] = useState(false);
  const [hypertensionChecked, setHypertensionChecked] = useState(false);
  const [aucuneChecked, setAucuneChecked] = useState(false);

  const goToPreferencies = () => {
    setregimesModalVisible(!regimesModalVisible);
  };

  const goToIllnesses = () => {
    setmaladieModalVisible(!maladieModalVisible);
    // setSelectedIllnesses([...selectedIllnesses])
  };

  const goToIngredients = () => {
    setIngredientsModalVisible(!ingredientsModalVisible);
  };

  const searchWord = (value) => {
    let bool = false;
    selectedIllnesses.map((el) => {
      if (el.maladie_name === value) bool = true;
    });
    return bool;
  };
  const ingredientsList = (value) => {
    let ingredients = [];
    selectedIngredients.forEach((obj) => {
      const ing = Object.values(obj)[0];
      ingredients.push(ing);
    });
    return ingredients;
  };

  const [isConnected, setIsconected] = useState(false);

  const handledisconnect = () => {
    dispatch(logout());
    setIsconected(true);
    navigation.navigate("Welcome");
  };

  const handleSelectionRegime = function (option) {
    setSelectedRegimes(option);
    dispatch(selectRegime(option));
  };

  const handleSelectionIllnesses = (option) => {
    // setSelectedIllnesses((prevOptions) => {
    if (selectedIllnesses.includes(option)) {
      dispatch(deleteIllness(option));
      setSelectedIllnesses(
        selectedIllnesses.filter((element) => element !== option)
      );
    } else {
      const illness = {
        maladie_name: option,
      };
      dispatch(addIllnesses(illness));
      setSelectedIllnesses([...selectedIllnesses, option]);
    }
  };

  useEffect(() => {
    if (suggestionSelected) {
      addWord();
      setNewWord("");
      setSuggestionSelected(false);

      setSuggestions([]);
    }
  }, [suggestionSelected]);

  useEffect(() => {
    setObesiteChecked(searchWord("Obésité"));
    setDiabeteChecked(searchWord("Diabète"));
    setHypertensionChecked(searchWord("Hypertension"));
    setAucuneChecked(searchWord("Aucun(e)"));
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `https://plate-suggest-backend.vercel.app/ingredients/${newWord}`
      );
      const data = await response.json();

      const autoAnswer = data.ingredients.map((e) => e.name);

      setSuggestions(autoAnswer);
      setShowList(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleRegimeModal = () => {
    setregimesModalVisible(false);

    fetch(
      `https://plate-suggest-backend.vercel.app/preferences/regime/${user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regime: user.preferences.regime }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("regime enregistré avec succès");
        }
      });
  };

  const handleMaladieseModal = () => {
    setmaladieModalVisible(false);

    fetch(
      `https://plate-suggest-backend.vercel.app/preferences/maladies/${user.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regime: user.preferences.maladies }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("maladies enregistré avec succès");
        }
      });
  };

  const handleChangeObesité = () => {
    setObesiteChecked(!obesiteChecked);
    handleSelectionIllnesses("Obésité");
  };

  const handleChangeDiabete = () => {
    setDiabeteChecked(!diabeteChecked);
    handleSelectionIllnesses("Diabète");
  };

  const handleChangeHypertension = () => {
    setHypertensionChecked(!hypertensionChecked);
    handleSelectionIllnesses("Hypertension");
  };

  const handleChangeAucune = () => {
    setAucuneChecked(!aucuneChecked);
    handleSelectionIllnesses("Aucun(e)");
  };

  const addWord = () => {
    if (newWord.trim() !== "") {
      const formattedWord = newWord
        .trim()
        .toLowerCase()
        .split("")
        .map((char, i) => (i === 0 ? char.toUpperCase() : char))
        .join("");

      setSelectedIngredients((prevList) => [...prevList, formattedWord]);
      setNewWord(" ");
      const ingredient = {
        ingredient_name: formattedWord,
      };
      dispatch(addIngredient(ingredient));
    }
  };
  const removeWord = (wordToRemove) => {
    setSelectedIngredients((prevWordList) =>
      prevWordList.filter((word) => word !== wordToRemove)
    );
    dispatch(deleteIngredient(wordToRemove));
  };
  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setNewWord(item);
        setSuggestionSelected(true);
        setShowList(false);
      }}
    >
      <Text style={styles.suggestionItem}>{item}</Text>
    </TouchableOpacity>
  );

  const renderWord = ({ item }) => (
    <View style={styles.renderWord}>
      <Text style={styles.wordItem}>{`\u2022 ${item}`}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeWord(item)}
      >
        <FontAwesome
          name="trash-o"
          onPress={() => removeWord(item)}
          size={30}
          color="#A41623"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.avatar}>
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
        <TouchableOpacity
          style={styles.regime}
          onPress={() => goToPreferencies()}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Régimes</Text>
          <FontAwesome name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {regimesModalVisible && (
        <Modal
          isVisible={regimesModalVisible}
          onBackdropPress={() => handleRegimeModal()}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
        >
          <View style={styles.regimesModal}>
            <View style={styles.divLogo}>
              <Image
                source={require("../assets/LogoPlateSuggest.png")}
                style={styles.logoPlateSuggest}
              />
            </View>
            <CheckBox
              title="Végétarien"
              containerStyle={{
                height: 60,
                justifyContent: "center",
                width: 150,
                alignItems: "center",
                borderRadius: 50,
                margin: 10,
              }}
              style={styles.CheckBox}
              checked={selectedRegimes === "Végétarien"}
              checkedColor="#A41623"
              onPress={() => handleSelectionRegime("Végétarien")}
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
              checked={selectedRegimes === "Végétalien"}
              checkedColor="#A41623"
              onPress={() => handleSelectionRegime("Végétalien")}
            />
            <CheckBox
              title="Pescétarien"
              containerStyle={{
                height: 60,
                justifyContent: "center",
                width: 150,
                alignItems: "center",
                borderRadius: 50,
                margin: 10,
              }}
              style={styles.CheckBox}
              checked={selectedRegimes === "Pescétarien"}
              checkedColor="#A41623"
              onPress={() => handleSelectionRegime("Pescétarien")}
            />
            <CheckBox
              title="Flexitarien"
              containerStyle={{
                height: 60,
                justifyContent: "center",
                width: 150,
                alignItems: "center",
                borderRadius: 50,
                margin: 10,
              }}
              style={styles.CheckBox}
              checked={selectedRegimes === "Flexitarien"}
              checkedColor="#A41623"
              onPress={() => handleSelectionRegime("Flexitarien")}
            />
            <CheckBox
              title="Mange tout"
              containerStyle={{
                height: 60,
                justifyContent: "center",
                width: 150,
                alignItems: "center",
                borderRadius: 50,
                margin: 10,
              }}
              style={styles.CheckBox}
              checked={selectedRegimes === "Mange tout"}
              checkedColor="#A41623"
              onPress={() => handleSelectionRegime("Mange tout")}
            />
          </View>
        </Modal>
      )}

      <View>
        <TouchableOpacity
          style={styles.maladie}
          onPress={() => goToIllnesses()}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Maladies</Text>
          <FontAwesome name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {maladieModalVisible && (
        <Modal
          isVisible={maladieModalVisible}
          onBackdropPress={() => handleMaladieseModal()}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
        >
          <View style={styles.maladieVisible}>
            <View style={styles.divLogo}>
              <Image
                source={require("../assets/LogoPlateSuggest.png")}
                style={styles.logoPlateSuggest}
              />
            </View>
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
              checked={obesiteChecked}
              checkedColor="#A41623"
              onPress={() => handleChangeObesité()}
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
              checked={diabeteChecked}
              checkedColor="#A41623"
              onPress={() => handleChangeDiabete()}
            />
            <CheckBox
              title="Hypertension"
              containerStyle={{
                height: 60,
                justifyContent: "center",
                width: 150,
                alignItems: "center",
                borderRadius: 50,
                margin: 10,
              }}
              style={styles.CheckBox}
              checked={hypertensionChecked}
              checkedColor="#A41623"
              onPress={() => handleChangeHypertension()}
            />
            <CheckBox
              title="Aucun(e)"
              containerStyle={{
                height: 60,
                justifyContent: "center",
                width: 150,
                alignItems: "center",
                borderRadius: 50,
                margin: 10,
              }}
              style={styles.CheckBox}
              checked={aucuneChecked}
              checkedColor="#A41623"
              onPress={() => handleChangeAucune()}
            />
          </View>
        </Modal>
      )}

      <View>
        <TouchableOpacity
          style={styles.product}
          onPress={() => goToIngredients()}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>
            Produits non désirés/Allergène(s)
          </Text>
          <FontAwesome name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {ingredientsModalVisible && (
        <Modal
          isVisible={ingredientsModalVisible}
          onBackdropPress={() => setIngredientsModalVisible(false)}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
        >
          <View style={styles.inputIngredients}>
            <View style={styles.divLogo}>
              <Image
                source={require("../assets/LogoPlateSuggest.png")}
                style={styles.logoPlateSuggest}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Écrivez un ingrédient..."
              value={newWord}
              onChangeText={(text) => {
                setNewWord(text);
                fetchSuggestions();
              }}
            />

            <TouchableOpacity style={styles.addButton} onPress={addWord}>
              <FontAwesome name="plus-circle" size={50} color="#A41623" />
            </TouchableOpacity>

            {showList && (
              <FlatList
                style={styles.suggestionsList}
                data={suggestions}
                renderItem={renderSuggestion}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.listContent}
              />
            )}

            <FlatList
              style={styles.list}
              data={ingredientsList([...selectedIngredients])}
              renderItem={renderWord}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.listContent}
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
    flexDirection: "column",
    paddingTop: 80,
  },

  avatar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  parent: {
    borderBottomWidth: 2,
    borderBottomColor: "#DFDFDF",
    flexDirection: "row-reverse",
  },

  regimesModal: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "60%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  partie2: {
    borderBottomWidth: 2,
    borderBottomColor: "#DFDFDF",
  },
  textButton: {
    fontSize: 19,
    marginTop: 20,
    fontFamily: "Sansita",
  },
  CheckBox: {},
  maladie: {
    justifyContent: "space-around",
  },
  maladieVisible: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "60%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  parent: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  parent2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  product: {},
  partie3: {
    borderBottomWidth: 2,
    borderBottomColor: "#DFDFDF",
  },

  textButton: {
    fontSize: 19,
    marginTop: 20,
    fontFamily: "Sansita",
  },
  deconnect: {
    fontSize: 19,
    marginTop: 20,
    fontFamily: "Sansita",
    marginTop: 100,
  },
  maladie: {
    justifyContent: "space-around",
  },
  icon: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  textButton: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#645354",
  },
  regime: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
    paddingBottom: 10,
    paddingTop: 15,
  },
  img: {
    height: 180,
    width: 180,
    borderRadius: 100,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#BEBEBE",
    paddingBottom: 10,
    paddingTop: 15,
  },
  maladie: {
    flexDirection: "row",
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
  logoPlateSuggest: {
    height: 60,
    width: 200,
  },
  questionText: {
    fontSize: 20,
    // fontWeight: "bold",
    marginBottom: 20,
    color: "#A41623",
    textAlign: "center",
    fontFamily: "SansitaBold",
  },
  span: {
    color: "black",
    fontFamily: "SansitaBold",
  },
  input: {
    width: "80%",
    fontSize: 20,
    backgroundColor: "#fff",
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 15,
    height: 55,
    color: "black",
    fontFamily: "Sansita",
  },
  inputIngredients: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
    zIndex: 50,
    height: "60%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  addButton: {
    position: "relative",
    top: 15,
  },
  list: {
    margin: 20,
    width: "50%",
    display: "flex",
  },
  suggestionsList: {
    marginVertical: 10,
    width: "80%",
    maxHeight: 200,
    zIndex: 5,
  },
  listContent: {
    justifyContent: "flex-start",
  },
});
