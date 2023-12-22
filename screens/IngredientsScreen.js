import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, deleteIngredient } from "../reducers/user";

export default function IngredientsScreen({ navigation }) {
  const [newWord, setNewWord] = useState("");
  const [wordList, setWordList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (suggestionSelected) {
      addWord();
      setNewWord("");
      setSuggestionSelected(false);

      setSuggestions([]);
    }
  }, [suggestionSelected]);

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

  const addWord = () => {
    if (newWord.trim() !== "") {
      const formattedWord = newWord
        .trim()
        .toLowerCase()
        .split("")
        .map((char, i) => (i === 0 ? char.toUpperCase() : char))
        .join("");

      setWordList((prevList) => [...prevList, formattedWord]);
      setNewWord(" ");
      const ingredient = {
        ingredient_name: formattedWord,
      };
      dispatch(addIngredient(ingredient));
    }
  };
  const removeWord = (wordToRemove) => {
    setWordList((prevWordList) =>
      prevWordList.filter((word) => word !== wordToRemove)
    );
    dispatch(deleteIngredient(wordToRemove));
  };

  const saveUserData = async () => {
    try {
      const response = await fetch(
        "https://plate-suggest-backend.vercel.app/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            regime: user.preferences.regime,
            maladies: user.preferences.illnesses,
            ingredients: user.preferences.ingredients,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User data saved:", data);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleNext = () => {
    saveUserData();
  };
  const handlePrevious = () => {
    navigation.navigate("Illness");
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
      <Text style={styles.wordItem}>{`\u2022 ${item.padEnd(20)}`}</Text>
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

  console.log(user);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.questionText}>
        Parlez-nous des ingrédients auxquels vous êtes{" "}
        <Text style={styles.span}>allergique</Text> et/ou que vous{" "}
        <Text style={styles.span}>n'aimez pas! </Text>:
      </Text>
      <View style={styles.inputIngredients}>
        <TextInput
          style={styles.input}
          placeholder="Type an ingredient..."
          value={newWord}
          onChangeText={(text) => {
            setNewWord(text);
            fetchSuggestions();
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWord}>
          <FontAwesome name="plus-circle" size={40} color="#A41623" />
        </TouchableOpacity>
      </View>

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
        data={wordList}
        renderItem={renderWord}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={handlePrevious}
        >
          <Text style={styles.previousButtonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 80,
    alignItems: "center",
  },
  questionText: {
    fontSize: 20,
    // fontWeight: "bold",
    marginBottom: 20,
    color: "#A41623",
    textAlign: "center",
    fontFamily: "SansitaBold",
  },
  option: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "lightgray",
  },
  nextButton: {
    backgroundColor: "#A41623",
    padding: 15,
    borderRadius: 20,
    marginBottom:20,
    alignItems: "center",
    marginTop: 20,
    height: 55,
    width: 150,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  previousButton: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    height: 55,
    width: 150,
    margin: 10,
    borderWidth: 3,
    borderColor: "#A41623",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    // fontWeight: "bold",
    fontFamily: "Sansita",
    fontSize: 18,
  },
  previousButtonText: {
    color: "#A41623",
    // fontWeight: "bold",
    fontFamily: "Sansita",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  checkbox: {
    marginRight: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Sansita",
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
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "lightgray",
    borderWidth: 1,
    width: "85%",
    borderRadius: 20,
    height: 70,
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
  wordItem: {
    fontSize: 20,
    fontFamily: "Sansita",
  },
  renderWord: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    fontFamily: "Sansita",
  },
  removeButton: {
    position: "absolute",
    right: 10,
  },
  listContent: {
    justifyContent: "flex-start",
  },
  suggestionsList: {
    marginVertical: 10,
    width: "80%",
    maxHeight: 200,
    zIndex: 5,
  },
  suggestionItem: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    fontFamily: "Sansita",
  },
});
