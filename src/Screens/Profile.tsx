import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ButtonComponent from '../Components/HOC/ButtonComponent';
import {logoutState} from '../redux/authSlice';
import {useGetMyProfileQuery} from '../redux/services/profileService';
import {useGetUserQuery} from '../redux/services/userService';
import {useLogoutQuery} from '../redux/services/authService';
import {skipToken} from '@reduxjs/toolkit/dist/query';

const Profile = ({route, navigation}: any) => {
  const {username} = route.params;
  const {data, isFetching, error}: any = useGetUserQuery(username);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logoutState());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>ProfileScreen</Text>
          <ButtonComponent
            onPress={() =>
              navigation.navigate('UpdateProfile', {
                username: data?.user.username,
              })
            }
            title="Edit Profile"
          />
          <ButtonComponent onPress={handleLogout} title="Logout" />
        </>
      )}
    </View>
  );
};

export default Profile;
