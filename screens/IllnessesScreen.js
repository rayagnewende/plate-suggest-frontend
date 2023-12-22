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
import { addIllnesses, deleteIllness } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function IllnessesScreen({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch();

  // const handleOptionSelect = ({ option }) => {
  //   setSelectedOptions((prevOptions) => {
  //     const isOptionSelected = prevOptions.some(
  //       (prevOption) => prevOption.maladie_name === option.maladie_name
  //     );

  //     if (isOptionSelected) {
  //       dispatch(deleteIllness(option));
  //       return prevOptions.filter(
  //         (element) => element.maladie_name !== option.maladie_name
  //       );
  //     } else {
  //       dispatch(addIllnesses({ maladie_name: option.maladie_name }));
  //       return [...prevOptions, option];
  //     }
  //   });
  // };
  const handleOptionSelect = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        dispatch(deleteIllness(option));
        return prevOptions.filter((element) => element !== option);
      } else {
        const illness = {
          maladie_name: option,
        };
        dispatch(addIllnesses(illness));
        return [...prevOptions, option];
      }
    });
  };
  const handleNext = () => {
    navigation.navigate("Ingredients");
  };
  const handlePrevious = () => {
    navigation.navigate("Preferences");
  };

  const renderOption = (option) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleOptionSelect(option)}
      key={option}
    >
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={selectedOptions.includes(option)}
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
      Souffrez-vous de l'une de ces maladies ?
      </Text>

      {renderOption("Diabète")}

      {renderOption("Hypertension")}
      {renderOption("Obésité")}

      {renderOption("Aucun(e)")}

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
    alignItems: "center",
    marginTop: 20,
    marginBottom:20,
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
    justifyContent: "space-between",
    width: 180,
  },
  checkbox: {
    marginRight: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Sansita",
  },
});
