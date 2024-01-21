import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { firebase } from '../config';
import backgroundImage from '../images/rm222-mind-14.jpg'

const Home = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [isFocused]);

  const fetchUserData = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setName(snapshot.data());
          } else {
            console.log('User does not exist');
          }
        });
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView style={styles.container} >
        <View style={styles.topArea}>
          <View style={styles.header}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop:15 }}>Welcome, {name.firstName}</Text>
          </View>

          <TouchableOpacity style={styles.avatarPlaceholder} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../images/defaultpp2.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <TouchableOpacity onPress={() => navigation.navigate('PGPRNav')} style={styles.button}>
            <Text style={styles.name}>PGP{'\n'}Residence</Text>
            <Image source={require('../images/pgpr-main-logo-copy-small.png')} style={styles.pgpr} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PH')} style={styles.button}>
            <Text style={styles.name}>Pioneer{'\n'}House</Text>
            <Image source={require('../images/304530529_590979289396237_6726837114097187089_n.jpg')} style={styles.pioneer} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LH')} style={styles.button}>
            <Text style={styles.name}>Light{'\n'}House</Text>
            <Image source={require('../images/logo_colour-01.png')} style={styles.light} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HH')} style={styles.button}>
            <Text style={styles.name}>Helix{'\n'}House</Text>
            <Image source={require('../images/helix-house-logo_final_coloured26f63701697940ac853f07cfa83c69bc.jpg')} style={styles.helix} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topArea: {
    backgroundColor: 'rgba(160, 202, 240, 0.8)',
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom:15

  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    marginTop: -10
  },
  header: {
    marginLeft: 15,
  },
  profileButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 25,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    height: 110,
    width: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: 'black',
  },
  name: {
    fontSize: 20,
    color: 'black',
  },
  pgpr: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 15,
  },
  pioneer: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginRight: 25,
  },
  light: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginRight: 15,
  },
  helix: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginRight: 8,
  },
  button2: {
    flexDirection: 'row',
    marginTop: 20,
    height: 60,
    width: 300,
    backgroundColor: '#d61f2c',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: "center",
    marginBottom: 20
  },
  name2: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  map: {
    width: 700,
    height: 700,
    resizeMode: 'contain',
    marginTop: -150,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 70,
    marginBottom: 10,
    position: 'absolute',
  },
  avatarPlaceholder: {
    width: 95,
    height: 95,
    backgroundColor: "#E1E2E6",
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  }
});
