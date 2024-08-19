import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';

const Stack = createNativeStackNavigator();

function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Onboarding" component={OnboardingScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}
export default App;