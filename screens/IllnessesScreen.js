import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { CheckBox } from "react-native-elements";

export default function IllnessesScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const handleNext = () => {
    navigation.navigate("Ingredients");
  };
  const handlePrevious = () => {
    navigation.navigate("Preferencies");
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
    <View style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.questionText}>
        Do you suffer from any of these illnesses?
      </Text>
      {renderOption("Diabetes")}

      {renderOption("Hypertension")}
      {renderOption("Obesity")}

      {renderOption("None")}

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
});
