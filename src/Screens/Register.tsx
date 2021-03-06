import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import RegisterImage from '../assets/images/Register.svg';
import ButtonComponent from '../Components/HOC/ButtonComponent';
import InputComponent from '../Components/HOC/InputComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {register} from '../interfaces/interfaces';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRegisterMutation} from '../redux/services/authService';
import {loginState} from '../redux/authSlice';

const Register = ({navigation}: any) => {
  const [user, setUser] = useState<register>({
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [register, {data, error, isLoading, isSuccess}]: any =
    useRegisterMutation();

  const setToken = async () => {
    try {
      await AsyncStorage.setItem('@token', JSON.stringify(data.token));
      await AsyncStorage.setItem('@user', JSON.stringify(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  if (isSuccess) {
    dispatch(loginState(data));
    setToken();
  }

  if (error) {
    if (error.error) {
      ToastAndroid.show(error.error, ToastAndroid.SHORT);
    }
  }

  const handleSubmit = async () => {
    console.log(user);
    register(user);
  };

  return (
    <View style={styles.container}>
      <RegisterImage width="80%" height="50%" />
      <View style={styles.form}>
        <InputComponent
          placeHolder="username"
          onChangeText={(username: string) =>
            setUser({...user, username: username.toLowerCase()})
          }
          helpText="username must be in lowercase"
        />
        <InputComponent
          placeHolder="Email"
          keyboardType="email-address"
          onChangeText={(email: string) =>
            setUser({...user, email: email.toLowerCase()})
          }
        />
        <InputComponent
          placeHolder="Password"
          secureTextEntry
          onChangeText={(password: string) => setUser({...user, password})}
        />
        <View style={styles.login}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <ButtonComponent
          onPress={handleSubmit}
          title="Register"
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  form: {
    marginTop: -50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  login: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
  },
});

export default Register;
