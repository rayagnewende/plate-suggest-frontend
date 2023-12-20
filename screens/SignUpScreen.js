import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { register } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [userERROR, setUserERROR] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    fetch("https://plate-suggest-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(register({ token: data.token, username, email, password }));

          navigation.navigate("Preferences");
        } else {
          setErrorMessage(data.error);
          setUserERROR(true);
        }
        setEmail("");
        setPassword("");
        setUsername("");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.title2}>Créer un compte</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        onChangeText={(value) => setUsername(value)}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Adresse email"
        onChangeText={(value) => setEmail(value)}
        textContentType="emailAddress"
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.input}
      />
      {userERROR && <Text style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Créez votre compte</Text>
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
    height: "10%",
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    fontFamily: "SansitaBold"
  },
  title2: {
    height: "10%",
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    fontFamily: "SansitaItalic"
  },
  input: {
    width: "80%",
    marginTop: 50,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 30,
    backgroundColor: "#fff",
    height: 55,
    borderRadius: 15,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Sansita",
    
  },
  button: {
    alignItems: "center",
    width: "80%",
    marginTop: 50,
    backgroundColor: "#A41623",
    borderRadius: 15,
    borderBlockColor: "#fff",
    marginBottom: 80,
    borderWidth: 2,
    borderColor: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
    height: 30,
    marginVertical: 8,
    fontFamily: "Sansita",
  },
  error: {
    marginTop: 10,
    color: "white",
    fontSize: 17,
    fontFamily: "Sansita",
  },
});
