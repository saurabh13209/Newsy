import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/Screens/Home/HomeScreen';
import MemesScreen from './src/Screens/Common/MemesScreen';
import ProfileScreen from './src/Screens/Profile/ProfileScreen';
import { fontCustomSize } from './src/Common/fontCustomSize';
import WorldScreen from './src/Screens/WorldNews/WorldScreen';
import FollowingScreen from './src/Screens/Following/FollowingScreen';
import BookmarkScreen from './src/Screens/Bookmark/BookmarkScreen';

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

  FollowingScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={FollowingScreen} name="FollowingScreen" options={{ title: "Following" }} />
        <Stack.Screen component={MemesScreen} name="MemesScreen" options={{ title: "Related Memes" }} />
      </Stack.Navigator>
    );
  }


  WorldScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={WorldScreen} name="HomeScreen" options={{ title: "World News" }} />
        <Stack.Screen component={MemesScreen} name="MemesScreen" options={{ title: "Related Memes" }} />
      </Stack.Navigator>
    );
  }

  BookmarkScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={BookmarkScreen} name="BookmarkScreen" options={{ title: "Bookmark" }} />
        <Stack.Screen component={MemesScreen} name="MemesScreen" options={{ title: "Related Memes" }} />
      </Stack.Navigator>
    );
  }




  HeadlineScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ title: "Newsy" }} />
        <Stack.Screen component={MemesScreen} name="MemesScreen" options={{ title: "Related Memes" }} />
      </Stack.Navigator>
    );
  }

  ProfileScreenFunc = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ProfileScreen} name="HomeScreen" options={{ title: "Newsy" }} />
        <Stack.Screen component={MemesScreen} name="MemesScreen" options={{ title: "Related Memes" }} />
      </Stack.Navigator>
    );
  }


  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen component={HomeScreenFunc} name="HomeFunc" options={{ tabBarIcon: ({ tintColor }) => (<Icon name="home" size={fontCustomSize(20)} color={tintColor} />), title: "Home" }} />
        <BottomTab.Screen component={FollowingScreenFunc} name="SubsFunc" options={{ tabBarIcon: ({ tintColor }) => (<Icon name="paperclip" size={fontCustomSize(20)} color={tintColor} />), title: "Following" }} />
        <BottomTab.Screen component={WorldScreenFunc} name="WorldFunc" options={{ tabBarIcon: ({ tintColor }) => (<Icon name="globe" size={fontCustomSize(20)} color={tintColor} />), title: "World " }} />
        <BottomTab.Screen component={BookmarkScreenFunc} name="BookFunc" options={{ tabBarIcon: ({ tintColor }) => (<Icon name="bookmark-o" size={fontCustomSize(20)} color={tintColor} />), title: "Bookmarked" }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}