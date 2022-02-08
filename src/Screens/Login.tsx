import React from 'react';
import {Text, View} from 'react-native';
import LoginComponent from '../Components/LoginComponent';

const Login: React.FC<any> = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <LoginComponent />
    </View>
  );
};

export default Login;
