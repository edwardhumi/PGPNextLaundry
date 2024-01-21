import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import Laundry from '../LaundryMachine.js';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const R1Washer = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.layout}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PGPRNav')} style={styles.backButton}>
          <Image source={require('../../../images/back.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
        <View style={styles.centeredContainer}>
          <View style={styles.washerContainer}>
            <Text style={styles.washerText}>R2 Dryer</Text>
          </View>
        </View>
      </View>
      <Laundry color='#FF7377' block='R2' machine='D1' />
      <Laundry color='#FF7377' block='R2' machine='D2' />
      <Laundry color='#FF7377' block='R2' machine='D3' />
    </ScrollView>
  );
};

export default R1Washer;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#A0CAF0',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    marginLeft: 25
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
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
  },
  washerContainer: {
    width: 240,
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: -10,
    borderWidth: 1,
  },
  washerText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
