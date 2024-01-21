import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  loginUser = async (email, password) => {
    if (email.trim() === '' || password === '') {
      // Check if email or password field is empty
      Alert.alert('Missing Fields', 'Please enter both Email and Password.');
      return;
    }
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        throw new Error('Email not verified. Please check your email and verify your account.');
      }

    }
    catch (error) {
      Alert.alert('Error', 'Password and Email does not match.');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <Image
            source={require('../images/logo.jpg')}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => { setEmail(email); }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => loginUser(email, password)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.outerText}>———— or ————</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={styles.button2}
          >
            <Text style={styles.buttonText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0CAF0',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#1775BB',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button2: {
    backgroundColor: '#A0CAF0',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText2: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  outerText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 16,
  },
  image: {
    marginLeft: -40,
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  registerText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d61f2c',
  },

});