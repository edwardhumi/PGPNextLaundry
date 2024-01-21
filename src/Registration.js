import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://pgpnextlaundry2-2d617.firebaseapp.com',
        })
          .then(() => {
            alert('Verification Email Sent. Please Go Back and Login')
          }).catch((error) => {
            alert(error.message)
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              })
          })
          .catch((error) => {
            alert(error.message)
          })
      })
      .catch((error) => {
        alert(error.message)
      })
  }
  const handleRegister = () => {
    //Prevents user to enter missing fields
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password === '') {
      Alert.alert('Error', 'Please fill in empty fields');
      return;
    }
        //Prevents user to create password with less than 8 characters
    if (password.length < 8) {
      Alert.alert('Password Requirement', 'Password must be at least 8 characters long');
      return;
    }
    registerUser(email, password, firstName, lastName);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image source={require('../images/back.png')} style={styles.backButtonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../images/reggg.jpg')}
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={(firstName) => setFirstName(firstName)}
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(lastName) => setLastName(lastName)}
              autoCorrect={false}
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
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0CAF0',
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButtonContainer: {
    width: '100%',
    alignItems: 'flex-start',
    padding: 50,
    marginLeft: -60,
    marginBottom: -50
  },
  backButton: {
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    padding: 15,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  backButtonImage: {
    width: '100%',
    height: '100%',
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
  image: {
    marginLeft: -8,
    width: 320,
    height: 320,
    resizeMode: 'contain',
    marginBottom: -50
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
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
})
