import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../assets/colors/colors';
import {useGetUserByIDQuery} from '../redux/services/userService';
import ProfileImage from '../assets/images/Profile.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import Moment from 'react-moment';
import MessageInputComponent from '../Components/MessageInputComponent';
import socket from '../../socketClient';
import {useGetAllMessagesOfChatQuery} from '../redux/services/messageService';

const {width, height} = Dimensions.get('window');

const Messages = ({navigation, route}: any) => {
  const {id, friendId} = route.params;
  const {user} = useSelector((state: any) => state.auth);
  const {data, isLoading, error, refetch} = useGetAllMessagesOfChatQuery(id);
  const friendProfile = useGetUserByIDQuery(friendId);
  const scrollViewRef: any = useRef();

  const [socketMessage, setSocketMessage] = useState<any>(null);

  useEffect(() => {
    socket.emit('joinChat', id);
  }, []);

  useEffect(() => {
    socket.on('SendMessage', data => {
      setSocketMessage(data);
    });
  }, [socket]);

  return (
    <View style={styles.conatiner}>
      {isLoading || friendProfile.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <SafeAreaView>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('HomeStack', {
                      screen: 'Home',
                    })
                  }>
                  <Ionicons
                    name="chevron-back"
                    size={25}
                    color={colors.textDark}
                  />
                </Pressable>
                {friendProfile.data.user.avatar.url === '' ? (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('UserStack', {
                        screen: 'User',
                        params: {
                          username: friendProfile.data.user.username,
                        },
                      })
                    }>
                    <ProfileImage width={40} height={40} />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('UserStack', {
                        screen: 'User',
                        params: {
                          username: friendProfile.data.user.username,
                        },
                      })
                    }>
                    <Image
                      source={{uri: friendProfile.data.user.avatar.url}}
                      style={styles.headerProfilePic}
                    />
                  </Pressable>
                )}
                <View style={{paddingHorizontal: 2}}>
                  <Text style={styles.usernameText}>
                    {friendProfile.data.user.username}
                  </Text>
                  {friendProfile.data.user.isOnline ? (
                    <Text style={styles.lastSeenText}>Active Now</Text>
                  ) : (
                    <Text style={styles.lastSeenText}>
                      Active{' '}
                      <Moment
                        style={styles.lastSeenText}
                        element={Text}
                        fromNow>
                        {friendProfile.data.user.lastSeen}
                      </Moment>{' '}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.headerRight}>
                <Pressable>
                  <Entypo
                    name="dots-three-vertical"
                    size={20}
                    color={colors.textDark}
                  />
                </Pressable>
              </View>
            </View>
          </SafeAreaView>

          <ScrollView
            style={styles.chatContainer}
            ref={ref => (scrollViewRef.current = ref)}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: false})
            }>
            {data.messages.map((message: any) => (
              <View key={message._id}>
                {message.sender === user._id ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <View style={styles.myMessageContainer}>
                      <Text style={styles.messageText}>{message.message}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.cardContainer}>
                    {friendProfile.data.user.avatar.url === '' ? (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('UserStack', {
                            screen: 'User',
                            params: {
                              username: friendProfile.data.user.username,
                            },
                          })
                        }>
                        <ProfileImage width={40} height={40} />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('UserStack', {
                            screen: 'User',
                            params: {
                              username: friendProfile.data.user.username,
                            },
                          })
                        }>
                        <Image
                          source={{uri: friendProfile.data.user.avatar.url}}
                          style={styles.profilePic}
                        />
                      </Pressable>
                    )}
                    <View style={styles.friendMessageContainer}>
                      <Text style={styles.messageText}>{message.message}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
            {socketMessage && (
              <>
                {socketMessage.sender === user._id ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <View style={styles.myMessageContainer}>
                      <Text style={styles.messageText}>
                        {socketMessage.message}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.cardContainer}>
                    {friendProfile.data.user.avatar.url === '' ? (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('UserStack', {
                            screen: 'User',
                            params: {
                              username: friendProfile.data.user.username,
                            },
                          })
                        }>
                        <ProfileImage width={40} height={40} />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('UserStack', {
                            screen: 'User',
                            params: {
                              username: friendProfile.data.user.username,
                            },
                          })
                        }>
                        <Image
                          source={{uri: friendProfile.data.user.avatar.url}}
                          style={styles.profilePic}
                        />
                      </Pressable>
                    )}
                    <View style={styles.friendMessageContainer}>
                      <Text style={styles.messageText}>
                        {socketMessage.message}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <KeyboardAvoidingView style={styles.inputContainer}>
            <SafeAreaView>
              <MessageInputComponent />
            </SafeAreaView>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width,
    height,
    paddingHorizontal: 8,
    backgroundColor: colors.backgroundColor,
    paddingBottom: 70,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    elevation: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  usernameText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 15,
  },
  lastSeenText: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    color: colors.textLight,
  },
  headerRight: {},
  chatContainer: {
    height: '90%',
  },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  myMessageContainer: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  friendMessageContainer: {
    marginVertical: 2,
    backgroundColor: colors.textLight,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginHorizontal: 5,
    marginTop: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 10,
  },
  inputContainer: {
    // position: 'absolute',
  },
});

export default Messages;
