import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { CheckBox } from "react-native-elements";

import { selectRegime } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function PreferenciesScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const handleOptionSelect = (option) => {
    dispatch(selectRegime(option));
    setSelectedOption(option);
  };
  const handleNext = () => {
    navigation.navigate("Illness");
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
      <Text style={styles.questionText}>
        How would you describe your food eating habits?
      </Text>
      {renderOption("Vegetalien")}

      {renderOption("Vegetarien")}
      {renderOption("Pescetarien")}
      {renderOption("Flexitarien")}
      {renderOption("I eat everything")}

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 180,
  },
  checkbox: {
    marginRight: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
    position: "relative",
    left: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
