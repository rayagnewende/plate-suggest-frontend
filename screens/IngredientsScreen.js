import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function IllnessesScreen({ navigation }) {
  const [newWord, setNewWord] = useState("");
  const [wordList, setWordList] = useState([]);

  const addWord = () => {
    if (newWord.trim() !== "") {
      setWordList((prevList) => [...prevList, newWord.trim()]);
      setNewWord("");
    }
  };
  const removeWord = (wordToRemove) => {
    setWordList((prevWordList) =>
      prevWordList.filter((word) => word !== wordToRemove)
    );
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleNext = () => {
    navigation.navigate("Ingredients");
  };
  const handlePrevious = () => {
    navigation.navigate("Illness");
  };

  const renderWord = ({ item }) => (
    <View>
      <Text style={styles.wordItem}>{`\u2022 ${item}`}</Text>
      <TouchableOpacity onPress={() => removeWord(item)}>
        <FontAwesome
          name="trash-o"
          onPress={() => removeWord(item)}
          size={25}
          color="#A41623"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ingredients Screen</Text>
    </View>
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
    fontSize: 40,
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
    height: 50,
    width: 150,
    margin: 10,
  },
  previousButton: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    height: 50,
    width: 150,
    margin: 10,
    borderWidth: 3,
    borderColor: "#A41623",
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
});
