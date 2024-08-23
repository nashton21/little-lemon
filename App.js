import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import HomeScreen from './screens/Home';

const Stack = createNativeStackNavigator();

function App() {

//  if (state.isLoading) {
//    return <SplashScreen />;
//  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{fname:"", emailadd: ""}} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;