import { useState } from 'react';
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
import { updateNickname } from '../reducers/user';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    dispatch(updateNickname(nickname));
    navigation.navigate('TabNavigator');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image style={styles.image} source={require('../assets/plate-suggest.png')} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button2} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    backgroundColor:'#A41623'
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#A41623',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 70,
    backgroundColor: '#A41623',
    borderRadius: 10,
    marginBottom: 80,
  },
  button2: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 0,
    backgroundColor: '#A41623',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 20,
  },
});

