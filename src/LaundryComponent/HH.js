import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HHDryer from './Machine/HHDryer.js';
import HHWasher from './Machine/HHWasher.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HH = () => {
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
      <Tab.Screen name="Washer" component={HHWasher} />
      <Tab.Screen name="Dryer" component={HHDryer} />
    </Tab.Navigator>
  );
}
export default HH

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1'
  }
})