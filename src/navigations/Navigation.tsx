import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNRestart from 'react-native-restart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../Screens/Home';
import Search from '../Screens/Search';
import User from '../Screens/User';
import Comments from '../Screens/Comments';
import Profile from '../Screens/Profile';
import colors from '../assets/colors/colors';
import UploadPost from '../Screens/UploadPost';
import Notification from '../Screens/Notification';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ToastAndroid,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutState} from '../redux/authSlice';
import UpdateProfile from '../Screens/UpdateProfile';
import ProfileImage from '../assets/images/Profile.svg';
import {
  useGetMyProfileQuery,
  useGetUserNotificationsQuery,
  useGetUserQuery,
} from '../redux/services/userService';
import Followers from '../Screens/Followers';
import Followings from '../Screens/Followings';
import Posts from '../Screens/Posts';
import Explore from '../Screens/Explore';
import SearchResult from '../Screens/SearchResult';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import ButtonComponent from '../Components/HOC/ButtonComponent';
import {io} from 'socket.io-client';
import socket from '../../socketClient';
import {setIsRead} from '../redux/notificationSlice';
import EditPost from '../Screens/EditPost';
import Messages from '../Screens/Messages';
import SavedPosts from '../Screens/SavedPosts';
import Chats from '../Screens/Chats';

const Bottom_Stack = createBottomTabNavigator();
const Home_Stack = createNativeStackNavigator();
const Search_Stack = createNativeStackNavigator();
const Auth_Stack = createNativeStackNavigator();
const Profile_Stack = createNativeStackNavigator();
const User_Stack = createNativeStackNavigator();
const Post_Stack = createNativeStackNavigator();
const Notification_Stack = createNativeStackNavigator();
const Chat_Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Home_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Home_Stack.Screen name="Home" component={Home} />
      <Home_Stack.Screen name="User" component={User} />
      <Home_Stack.Screen name="PostStack" component={PostStack} />
      <Home_Stack.Screen name="ChatStack" component={ChatStack} />
    </Home_Stack.Navigator>
  );
};

export const ChatStack = () => {
  return (
    <Chat_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Chats">
      <Chat_Stack.Screen name="Chats" component={Chats} />
      <Chat_Stack.Screen name="Messages" component={Messages} />
      <Chat_Stack.Screen name="UserStack" component={UserStack} />
    </Chat_Stack.Navigator>
  );
};

export const UserStack = () => {
  return (
    <User_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="User">
      <User_Stack.Screen name="User" component={User} />
      <User_Stack.Screen name="Followers" component={Followers} />
      <User_Stack.Screen name="Followings" component={Followings} />
      <User_Stack.Screen name="Comments" component={Comments} />
      <User_Stack.Screen name="PostStack" component={PostStack} />
    </User_Stack.Navigator>
  );
};

export const SearchStack = () => {
  return (
    <Search_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Search">
      <Search_Stack.Screen name="Search" component={Search} />
      <Search_Stack.Screen name="UserStack" component={UserStack} />
      <Search_Stack.Screen name="PostStack" component={PostStack} />
      <Search_Stack.Screen name="Explore" component={Explore} />
      <Search_Stack.Screen name="SearchResult" component={SearchResult} />
    </Search_Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const {user} = useSelector((state: any) => state.auth);
  return (
    <Profile_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Profile_Stack.Screen
        name="Profile"
        component={Profile}
        initialParams={{username: user?.username}}
      />
      <Profile_Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Profile_Stack.Screen name="Followers" component={Followers} />
      <Profile_Stack.Screen name="Followings" component={Followings} />
      <Profile_Stack.Screen name="UserStack" component={UserStack} />
      <Profile_Stack.Screen name="PostStack" component={PostStack} />
      <Profile_Stack.Screen name="SavedPosts" component={SavedPosts} />
    </Profile_Stack.Navigator>
  );
};

export const PostStack = () => {
  return (
    <Post_Stack.Navigator
      initialRouteName="UploadPost"
      screenOptions={{headerShown: false}}>
      <Post_Stack.Screen name="UploadPost" component={UploadPost} />
      <Post_Stack.Screen name="Posts" component={Posts} />
      <Post_Stack.Screen name="EditPost" component={EditPost} />
      <Post_Stack.Screen name="Comments" component={Comments} />
    </Post_Stack.Navigator>
  );
};

export const NotificationStack = () => {
  return (
    <Notification_Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{headerShown: false}}>
      <Notification_Stack.Screen name="Notification" component={Notification} />
      <Notification_Stack.Screen name="UserStack" component={UserStack} />
      <Notification_Stack.Screen name="PostStack" component={PostStack} />
    </Notification_Stack.Navigator>
  );
};

export const BottomStack = () => {
  const [errors, setErrors] = useState<any>(null);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const {user, token} = useSelector((state: any) => state.auth);
  const userNotifications = useGetUserNotificationsQuery(user?.username);
  const {isRead} = useSelector((state: any) => state.notifications);
  const dispatch = useDispatch();

  if (userNotifications.error) {
    setErrors(userNotifications.error);
  }

  useEffect(() => {
    if (userNotifications.isLoading) {
      <ActivityIndicator />;
    } else {
      console.log('bottom tab');
      userNotifications.data.notifications.forEach((item: any) => {
        if (item.isRead === true) {
          dispatch(setIsRead(true));
        } else {
          dispatch(setIsRead(false));
        }
      });
    }
  }, [userNotifications.isSuccess]);

  useEffect(() => {
    socket.connect();
    socket.emit('Join', user);
    socket.on('Notification', async (notification: any) => {
      dispatch(setIsRead(false));
    });
  }, [socket || user]);

  if (errors) {
    if (errors.error) {
      ToastAndroid.show(errors.error, ToastAndroid.SHORT);
      setErrors(null);
    } else {
      Alert.alert('Error', errors.data.message);
      if (errors.status === 401) {
        dispatch(logoutState());
      }
      setErrors(null);
    }
  }

  const handleLogout = () => {
    // dispatch(removeAllPosts());
    // dispatch(removeTimelinePosts());
    socket.disconnect();
    dispatch(logoutState());
  };

  return (
    <>
      <Modal
        isVisible={isModelOpen}
        onBackdropPress={() => setIsModelOpen(!isModelOpen)}
        onBackButtonPress={() => setIsModelOpen(!isModelOpen)}
        avoidKeyboard={true}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{display: 'flex', justifyContent: 'flex-end'}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.backgroundColor,
          }}>
          <ButtonComponent
            onPress={handleLogout}
            title="Logout"
            primaryFullWidth
          />
        </View>
      </Modal>
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
          name="PostStack"
          component={PostStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={focused ? colors.primaryColor : color}
                size={30}
              />
            ),
          }}
        />
        <Bottom_Stack.Screen
          name="NotificationStack"
          component={NotificationStack}
          options={{
            tabBarIcon: ({focused, color}) => (
              <>
                <AntDesign
                  name="heart"
                  color={focused ? colors.primaryColor : color}
                  size={25}
                />

                {isRead === false && (
                  <View
                    style={{
                      backgroundColor: colors.primaryColor,
                      width: 5,
                      height: 5,
                      marginTop: 2,
                      borderRadius: 5,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}></View>
                )}
              </>
            ),
          }}
        />
        <Bottom_Stack.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: ({focused, color}) => {
              return (
                <>
                  <Pressable onLongPress={() => setIsModelOpen(true)}>
                    {user?.avatar.url === '' ? (
                      <View
                        style={{
                          backgroundColor: colors.backgroundColor,
                          borderColor: focused
                            ? colors.primaryColor.toString()
                            : colors.backgroundColor,
                          borderWidth: 2,
                          borderRadius: 50,
                          padding: 1,
                        }}>
                        <ProfileImage height={25} width={25} />
                      </View>
                    ) : (
                      <>
                        <Image
                          source={{uri: user?.avatar.url}}
                          style={{
                            borderColor: focused
                              ? colors.primaryColor
                              : colors.backgroundColor,
                            borderWidth: 2,
                            borderRadius: 50,
                            padding: 2,
                            width: 25,
                            height: 25,
                          }}
                          resizeMode="cover"
                        />
                      </>
                    )}
                  </Pressable>
                </>
              );
            },
          }}
        />
      </Bottom_Stack.Navigator>
    </>
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
  const {token, user} = useSelector((state: any) => state.auth);
  const [isOffilne, setIsOffilne] = useState<boolean>(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsOffilne(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  if (isOffilne) {
    ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
  }

  return <>{token ? <BottomStack /> : <AuthStack />}</>;
};

export default RootStack;
