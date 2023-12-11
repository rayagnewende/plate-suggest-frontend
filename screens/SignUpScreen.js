import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const router = useRouter();
  if (user.token) {
    router.push('/');
  }

  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
     fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, username, password }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ token: data.token, username, firstName }));
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.title2}>Creer un compte</Text>

      <TextInput placeholder="Adresse email" onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />
      <TextInput placeholder="Nom d'utilisateur" onChangeText={(value) => setFirstName(value)} value={firstName} style={styles.input} />
      <TextInput placeholder="mot de passe" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Enregistré</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A41623',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '30%',
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  input: {
    width: '80%',
    marginTop: 50,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 30,
    backgroundColor: '#fff',
    borderRadius:''

  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 50,
    backgroundColor: '#A41623',
    borderRadius: 10,
    borderBlockColor: '#fff',
    marginBottom: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  title2: {
    width: '30%',
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  }
});