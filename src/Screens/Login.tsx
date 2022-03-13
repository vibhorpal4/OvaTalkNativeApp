import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import ButtonComponent from '../Components/HOC/ButtonComponent';
import InputComponent from '../Components/HOC/InputComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginImage from '../assets/images/Login.svg';
import {login} from '../interfaces/interfaces';
import {useLoginMutation} from '../redux/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginState} from '../redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import RNRestart from 'react-native-restart';

const Login = ({navigation}: any) => {
  const [user, setUser] = useState<login>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const [login, {isLoading, error, isSuccess, data, isError}]: any =
    useLoginMutation();

  if (isSuccess) {
    dispatch(loginState(data));
  }

  if (error) {
    if (error.error) {
      ToastAndroid.show(error.error, ToastAndroid.SHORT);
    }
  }

  const handleSubmit = async () => {
    await login(user);
  };

  return (
    <View style={styles.container}>
      <LoginImage width="80%" height="50%" />
      <View style={styles.form}>
        {error && <Text style={{color: 'red'}}>{error.data.message}</Text>}
        <InputComponent
          placeHolder="Email"
          keyboardType="email-address"
          // value={user.email}
          onChangeText={(email: string) => setUser({...user, email})}
        />
        <InputComponent
          placeHolder="********"
          // value={user.password}
          onChangeText={(password: string) => setUser({...user, password})}
          secureTextEntry
        />
        <View style={styles.register}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>

        <ButtonComponent
          title="Login"
          onPress={handleSubmit}
          icon={<MaterialCommunityIcons name="login" size={13} color="white" />}
          primary
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  registerText: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
  },
});

export default Login;
