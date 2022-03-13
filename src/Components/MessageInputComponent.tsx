import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useSendMessageMutation} from '../redux/services/messageService';
import socket from '../../socketClient';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const MessageInputComponent = () => {
  const [message, setMessage] = useState<any>(null);
  const [sendMessage, {data, isLoading, isSuccess, error}] =
    useSendMessageMutation();
  const {user} = useSelector((state: any) => state.auth);
  const [typing, setTyping] = useState<boolean>(false);

  const handleChange = (e: any) => {
    if (!typing) {
      setTyping(true);
      socket.emit('typing');
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit('stopTyping');
        setTyping(false);
      }
    }, timerLength);

    setMessage(e);
  };

  const handleSubmit = async () => {
    socket.emit('SendMessage', {message, sender: user._id});
    const form = new FormData();
    form.append('message', message);
    await sendMessage({id: user._id, body: form});
    setMessage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Pressable style={styles.cameraContainer}>
          <FontAwesome name="camera" size={20} color="white" />
        </Pressable>
        <TextInput
          multiline
          placeholder="Message..."
          value={message}
          style={styles.input}
          placeholderTextColor={colors.textLight}
          onChangeText={(e: any) => handleChange(e)}
        />

        <Pressable>
          <MaterialIcons
            name="photo-library"
            size={25}
            color={colors.textDark}
          />
        </Pressable>
      </View>
      <View style={styles.right}>
        {message === null ? (
          <Pressable>
            <View style={styles.microPhoneContainer}>
              <FontAwesome name="microphone" color={'white'} size={20} />
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={handleSubmit}>
            <View style={styles.microPhoneContainer}>
              <Feather name="send" color={'white'} size={20} />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    marginHorizontal: 4,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    width: '82%',
  },
  cameraContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    maxHeight: 100,
    backgroundColor: 'transparent',
    color: colors.textDark,
    width: '75%',
    marginLeft: 4,
  },
  right: {},
  microPhoneContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageInputComponent;
