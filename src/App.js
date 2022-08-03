import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';


import HomeScreen from './Screens/Home/HomeScreen';
import PokemonSearch from './Screens/PokemonSearch/PokemonSearch';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <ToastProvider
      normalColor='#4298f5'
      duration={3000}
      animationType="slide-in"
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName='search'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={PokemonSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
