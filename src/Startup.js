import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Startup = () => {
    const navigation = useNavigation();
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <KeyboardAvoidingView style={styles.inputContainer}>
            <Image
              source={require('../images/startpage.png')}
              style={styles.image}
            />
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

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
    
    export default Startup;
    
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
      buttonContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: 'white',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:10
      },
      buttonText: {
        color: '#47A8FF',
        fontWeight: '700',
        fontSize: 16,
      },
      button2: {
        backgroundColor: '#A0CAF0',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:10,
        borderWidth: 1,
        borderColor: 'white',
      },
      buttonText2: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
      },
    });