import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addIngredient, deleteIngredient } from "../reducers/user";

export default function IllnessesScreen({ navigation }) {
  const [newWord, setNewWord] = useState("");
  const [wordList, setWordList] = useState([]);
  const dispatch = useDispatch();
  const addWord = () => {
    if (newWord.trim() !== "") {
      setWordList((prevList) => [
        ...prevList,
        newWord
          .trim()
          .toLowerCase()
          .split("")
          .map((char, i) => (i === 0 ? char.toUpperCase() : char))
          .join(""),
      ]);
      setNewWord("");
      dispatch(addIngredient(newWord.trim()));
    }
  };
  const removeWord = (wordToRemove) => {
    setWordList((prevWordList) =>
      prevWordList.filter((word) => word !== wordToRemove)
    );
    dispatch(deleteIngredient(wordToRemove));
  };

  const handleNext = () => {
    navigation.navigate("Welcome");
  };
  const handlePrevious = () => {
    navigation.navigate("Illness");
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.questionText}>
        Tell us about the ingredients you are{" "}
        <Text style={styles.span}>allergic</Text> to and/or{" "}
        <Text style={styles.span}>dislike</Text>:
      </Text>
      <View style={styles.inputIngredients}>
        <TextInput
          style={styles.input}
          placeholder="Type an ingredient..."
          value={newWord}
          onChangeText={(text) => setNewWord(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWord}>
          <FontAwesome name="plus-circle" size={40} color="#A41623" />
        </TouchableOpacity>
      </View>

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
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    fontWeight: "bold",
    marginBottom: 20,
    color: "#A41623",
    textAlign: "center",
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
    fontWeight: "bold",
  },
  previousButtonText: {
    color: "#A41623",
    fontWeight: "bold",
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
  },
  span: {
    color: "black",
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
  },
  renderWord: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  removeButton: {
    position: "absolute",
    right: 10,
  },
  listContent: {
    justifyContent: "flex-start",
  },
});
