import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/Screens/Home/HomeScreen';

export default App = () => {

  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();

  HomeScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ title: "Newsy" }} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen component={HomeScreenFunc} name="HomeFunc" options={{ title: "Home" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="HeadlineFunc" options={{ title: "Headline" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="SubsFunc" options={{ title: "Newsy" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="BookFunc" options={{ title: "Newsy" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="ProfileFunc" options={{ title: "Newsy" }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}