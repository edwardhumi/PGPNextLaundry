import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PHDryer from './Machine/PHDryer.js';
import PHWasher from './Machine/PHWasher.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const PH = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Washer') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Dryer') {
            iconName = focused ? 'thermometer' : 'thermometer-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(233, 233, 233, 1)',
        },
        tabBarLabelStyle: {
          marginBottom: 2,
        },
      })}
    >
      <Tab.Screen name="Washer" component={PHWasher} />
      <Tab.Screen name="Dryer" component={PHDryer} />
    </Tab.Navigator>
  );
}
export default PH

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1'
  }
})