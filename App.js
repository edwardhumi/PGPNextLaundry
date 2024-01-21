import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import QRTest from "./src/QRTest"
import Queue from "./src/Queue"
import Report from "./src/Report"
import Profile from "./src/Profile"
import PGPRNav from "./src/PGPRNav"
import R1 from "./src/LaundryComponent/R1"
import R2 from "./src/LaundryComponent/R2"
import R3 from "./src/LaundryComponent/R3"
import PH from "./src/LaundryComponent/PH"
import LH from "./src/LaundryComponent/LH"
import HH from "./src/LaundryComponent/HH"
import Startup from "./src/Startup";
import Maps from "./src/Maps"

const Stack = createStackNavigator();


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) {
    return null;
  }
  if (!user || !user.emailVerified) {
    return (

      <Stack.Navigator>
      <Stack.Screen
          name="Startup"
          component={Startup}
          options = {{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options = {{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown:false
          }}
        />
      <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown:false
          }}
        />
      <Stack.Screen
        name="Queue"
        component={Queue}
        options={{
            headerShown:true
          }}
      />
      <Stack.Screen
        name="QRTest"
        component={QRTest}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
            headerShown:true
          }}
      />
      <Stack.Screen
        name="PGPRNav"
        component={PGPRNav}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="R1"
        component={R1}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="R2"
        component={R2}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="R3"
        component={R3}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="PH"
        component={PH}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="LH"
        component={LH}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="HH"
        component={HH}
        options={{
            headerShown:false
          }}
      />
    <Stack.Screen
        name="Notif"
        component={Notif}
        options={{
            headerShown:false
          }}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{
            headerShown:false
          }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}