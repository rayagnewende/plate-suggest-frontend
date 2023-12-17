import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  const goToSignin = () => {
    navigation.navigate("SignIn");
  };

  const goToSignup = () => {
    navigation.navigate("SignUp");
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.image}
        source={require("../assets/plate-suggest.png")}
      />
      <TouchableOpacity
        onPress={() => goToSignin()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goToSignup()}
        style={styles.button2}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton2}>S'inscrire</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "50%",
    backgroundColor: "#A41623",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#A41623",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 70,
    backgroundColor: "#A41623",
    borderRadius: 15,
    marginBottom: 50,
    borderWidth: 2,
    borderColor: "#A41623",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 80,
    borderWidth: 2,
    borderColor: "#A41623",
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 8,
  },
  textButton2: {
    color: "#A41623",
    height: 30,
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 8,
  },
});
