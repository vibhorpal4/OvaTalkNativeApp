import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Screens/Home';
import Search from '../Screens/Search';
import User from '../Screens/User';
import Post from '../Screens/Post';
import Profile from '../Screens/Profile';
import colors from '../assets/colors/colors';
import UploadPost from '../Screens/UploadPost';
import Notification from '../Screens/Notification';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const Bottom_Stack = createBottomTabNavigator();
const Home_Stack = createNativeStackNavigator();
const Search_Stack = createNativeStackNavigator();
const Auth_Stack = createNativeStackNavigator();
const Profile_Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Home_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Home_Stack.Screen name="Home" component={Home} />
      <Home_Stack.Screen name="User" component={User} />
      <Home_Stack.Screen name="Post" component={Post} />
    </Home_Stack.Navigator>
  );
};

export const SearchStack = () => {
  return (
    <Search_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Search">
      <Search_Stack.Screen name="Search" component={Search} />
      <Search_Stack.Screen name="User" component={User} />
      <Search_Stack.Screen name="Post" component={Post} />
    </Search_Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Profile_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Profile_Stack.Screen name="Profile" component={Profile} />
    </Profile_Stack.Navigator>
  );
};

export const BottomStack = () => {
  return (
    <Bottom_Stack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#EFF3F5',
        },
      }}
      initialRouteName="HomeStack">
      <Bottom_Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name="md-home"
              color={focused ? colors.primaryColor : color}
              size={25}
            />
          ),
        }}
      />
      <Bottom_Stack.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              name="md-search"
              color={focused ? colors.primaryColor : color}
              size={25}
            />
          ),
        }}
      />
      <Bottom_Stack.Screen
        name="Upload"
        component={UploadPost}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={focused ? colors.primaryColor : color}
              size={25}
            />
          ),
        }}
      />
      <Bottom_Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name="bell"
              color={focused ? colors.primaryColor : color}
              size={25}
            />
          ),
        }}
      />
      <Bottom_Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={focused ? colors.primaryColor : color}
              size={25}
            />
          ),
        }}
      />
    </Bottom_Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Auth_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Auth_Stack.Screen name="Login" component={Login} />
      <Auth_Stack.Screen name="Register" component={Register} />
    </Auth_Stack.Navigator>
  );
};

const RootStack = () => {
  const [authToken, setAuthToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('@token');
      setAuthToken(userToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return authToken ? <BottomStack /> : <AuthStack />;
};

export default RootStack;
