import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editFirstNameVisible, setEditFirstNameVisible] = useState(false);
  const [editLastNameVisible, setEditLastNameVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    alert('Please Do Not Change Your Name Whilst Booking')
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userId);

    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        setUser(doc.data());
        setEditFirstName(doc.data().firstName);
        setEditLastName(doc.data().lastName);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  const handleUpdateFirstName = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userRef = firebase.firestore().collection('users').doc(userId);

      const updatedFirstName = editFirstName.trim() !== '' ? editFirstName.trim() : user.firstName;

      await userRef.update({
        firstName: updatedFirstName,
      });

      setEditFirstNameVisible(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateLastName = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const userRef = firebase.firestore().collection('users').doc(userId);

      const updatedLastName = editLastName.trim() !== '' ? editLastName.trim() : user.lastName;

      await userRef.update({
        lastName: updatedLastName,
      });

      setEditLastNameVisible(false);
    } catch (error) {
      alert(error.message);
    }
  };
  if (user === null) {
    return <Text>Loading...</Text>;
  }
  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={require('../images/back.png')} style={styles.backButtonImage} />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.avatarPlaceholder}>
            <Image source={require('../images/defaultpp2.png')} style={styles.avatar} />

        </TouchableOpacity>

        <Text style={styles.label}>First Name:</Text>
        {!editFirstNameVisible ? (
          <View style={styles.nameContainer}>
            <Text>{user.firstName}</Text>
            <TouchableOpacity onPress={() => setEditFirstNameVisible(true)}>
              <Icon name="edit" size={20} color="blue" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={[styles.input, styles.centerInput]}
              value={editFirstName}
              onChangeText={setEditFirstName}
              placeholder="Edit First Name"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateFirstName}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.label}>Last Name:</Text>
        {!editLastNameVisible ? (
          <View style={styles.nameContainer}>
            <Text>{user.lastName}</Text>
            <TouchableOpacity onPress={() => setEditLastNameVisible(true)}>
              <Icon name="edit" size={20} color="blue" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={[styles.input, styles.centerInput]}
              value={editLastName}
              onChangeText={setEditLastName}
              placeholder="Edit Last Name"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateLastName}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={handleSignOut} style={styles.outButton}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#A0CAF0',
    justifyContent: 'center'
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  centerInput: {
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  editIcon: {
    marginLeft: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#1775BB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 40,
    marginBottom: 10
  },
  outButton: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#d61f2c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 30,
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
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 70,
    marginBottom: 10,
    position: 'absolute',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#E1E2E6",
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  }
});

export default Profile;