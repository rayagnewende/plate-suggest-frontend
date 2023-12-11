import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignInScreen({ navigation }) {
  const goToSignup = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Te revoilà!</Text>
      <Text style={styles.title2}>Connexion</Text>

      <TextInput placeholder="Adresse email" style={styles.input} />
      <TextInput placeholder="mot de passe" style={styles.input} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A41623",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "30%",
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  input: {
    width: "80%",
    marginTop: 50,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 30,
    backgroundColor: "#fff",
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    padding: 8,
    width: "80%",
    marginTop: 50,
    backgroundColor: "#A41623",
    borderRadius: 10,
    borderBlockColor: "#fff",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    textAlign: "center",
    marginVertical: 8,
  },
  textButton: {
    color: "#ffffff",
    height: 25,
    fontWeight: "600",
    fontSize: 19,
    fontStyle: "italic",
  },
  title2: {
    width: "30%",
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
