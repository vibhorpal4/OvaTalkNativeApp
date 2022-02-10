import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ButtonComponent from '../Components/HOC/ButtonComponent';
import {logoutState} from '../redux/authSlice';

const Profile: React.FC<any> = ({navigation}) => {
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
      <Text>ProfileScreen</Text>
      <ButtonComponent
        onPress={() => navigation.navigate('UpdateProfile')}
        title="Edit Profile"
      />
      <ButtonComponent onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default Profile;
