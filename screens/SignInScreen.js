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

export default function SignInScreen({ navigation }) {
 
    
   // const user = useSelector((state) => state.user.value);
  
    // Redirect to /home if logged in
    //const router = useRouter();
    //if (user.token) {
    //  router.push('/');
    // }
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [emailERROR, setEmailERROR] = useState(false);

    const handleSubmit = () => {
      fetch('https://plate-suggest-backend.vercel.app/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).then(response => response.json())
        .then(data => {
          data.result && dispatch(register({ token: data.token, email: data.email, password: data.password }));
          if(EMAIL_REGEX.test(email)) {
          navigation.navigate("Welcome")
          } else {
            setEmailERROR(false)
          }
          setEmail('');setPassword('');
        });
    };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Te revoilà!</Text>
      <Text style={styles.title2}>Connexion</Text>

      <TextInput placeholder="Adresse email" textContentType="emailAdress"  style={styles.input} />
      { emailERROR && <Text style={styles.error}>Adresse email invalide</Text>}
      <TextInput placeholder="mot de passe" secureTextEntry={true} style={styles.input} />
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
    height: "10%",
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    fontStyle: "italic",
  },
  title2: {
    height : "10%",
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    fontStyle: "italic",
  },
  input: {
    width: "80%",
    marginTop: 50,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 20,
    backgroundColor: "#fff",
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 15,
    height: 55,
    color : "#A41623",
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
    fontStyle: "italic",
  },
  error:{
    marginTop: 10,
    color: "red",
  }
});
