import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import R2Dryer from './Machine/R2Dryer.js';
import R2Washer from './Machine/R2Washer.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const R2 = () => {
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
      <Tab.Screen name="Washer" component={R2Washer} />
      <Tab.Screen name="Dryer" component={R2Dryer} />
    </Tab.Navigator>
  );
}
export default R2

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1'
  }
})