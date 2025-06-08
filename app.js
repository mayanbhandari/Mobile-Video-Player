import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing all screens
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';
import SettingsScreen from './screens/SettingsScreen';
import SecurityStatusScreen from './screens/SecurityStatusScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Secure Video Player' }}
        />
        <Stack.Screen 
          name="Player" 
          component={PlayerScreen} 
          options={{ title: 'Video Player' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Settings' }}
        />
        <Stack.Screen 
          name="SecurityStatus" 
          component={SecurityStatusScreen} 
          options={{ title: 'Security Status' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
