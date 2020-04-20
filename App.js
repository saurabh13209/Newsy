import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/Screens/Home/HomeScreen';
import MemesScreen from './src/Screens/Common/MemesScreen';

export default App = () => {

  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();

  HomeScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ title: "Newsy" }} />
        <Stack.Screen component={MemesScreen} name="MemesScreen" options={{ title: "Related Memes" }} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen component={HomeScreenFunc} name="HomeFunc" options={{ title: "Home" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="HeadlineFunc" options={{ title: "Breaking News" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="SubsFunc" options={{ title: "Following" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="BookFunc" options={{ title: "Bookmarked" }} />
        <BottomTab.Screen component={HomeScreenFunc} name="ProfileFunc" options={{ title: "Profile" }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}