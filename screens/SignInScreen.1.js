import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "./SignInScreen";

export default function SignInScreen({ navigation }) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailERROR, setEmailERROR] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    fetch("https://plate-suggest-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.result) {
          dispatch(
            login({
              token: data.token,
              email: data.email,
              password: data.password,
            })
          );
          navigation.navigate("Welcome");
        }else{
          setErrorMessage("Identifiants incorrect");
          setEmailERROR(true);
        }
        setEmail("");
        setPassword("");
        setErrorMessage("");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Te revoilà!</Text>
      <Text style={styles.title2}>Connexion</Text>

      <TextInput
        placeholder="Adresse email"
        textContentType="emailAddress"
        onChangeText={(value) => setEmail(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="mot de passe"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        style={styles.input}
      />
      {emailERROR && <Text style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
