import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignUpScreen({ navigation }) {
  //   const [firstName, setFirstName] = useState("");
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

//   const handleSubmit = () => {
//     fetch("http://localhost:3000/users/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ firstName, username, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         data.result &&
//           dispatch(login({ token: data.token, username, firstName }));
//       });
//   };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.title2}>Creer un compte</Text>

      <TextInput
        placeholder="Adresse email"
        // onChangeText={(value) => setUsername(value)}
        // value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Nom d'utilisateur"
        // onChangeText={(value) => setFirstName(value)}
        // value={firstName}
        style={styles.input}
      />
      <TextInput
        placeholder="mot de passe"
        // onChangeText={(value) => setPassword(value)}
        // value={password}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Enregistré</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A41623",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "25%",
    height: "10%",
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    fontStyle: "italic",
  },
  input: {
    width: "80%",
    marginTop: 50,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 30,
    backgroundColor: "#fff",
    height: 70,
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    padding: 8,
    width: "80%",
    marginTop: 50,
    backgroundColor: "#A41623",
    borderRadius: 30,
    borderBlockColor: "#fff",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    textAlign: "center",
    marginVertical: 8,
    height: 70,
  },
  textButton: {
    color: "#fff",
    height: 30,
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 8,
    fontStyle: "italic",
  },
  title2: {
    width: "30%",
    height : "10%",
    fontSize: 25,
    fontWeight: "600",
    color: "white",
    fontStyle: "italic",
  },
});
