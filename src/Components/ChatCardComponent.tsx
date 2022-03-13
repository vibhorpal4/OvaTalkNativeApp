import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import ProfileImage from '../assets/images/Profile.svg';
import {useGetUserByIDQuery} from '../redux/services/userService';
import colors from '../assets/colors/colors';
import Moment from 'react-moment';
import {useNavigation} from '@react-navigation/native';

const ChatCardComponent = ({item}: any) => {
  const {user} = useSelector((state: any) => state.auth);
  const navigation: any = useNavigation();
  const friends = item.members.find((member: any) => member !== user._id);

  const {data, isLoading, isSuccess, error} = useGetUserByIDQuery(friends);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Pressable
          onPress={() =>
            navigation.navigate('ChatStack', {
              screen: 'Messages',
              params: {id: item._id, friendId: data.user._id},
            })
          }>
          <View style={styles.container}>
            <View style={styles.cardLeft}>
              {data.user.avatar.url === '' ? (
                <ProfileImage width={50} height={50} />
              ) : (
                <Image
                  source={{uri: data.user.avatar.url}}
                  style={styles.profilePic}
                />
              )}
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{data.user.username}</Text>
                <Text style={styles.lastSeenText}>
                  Active{' '}
                  <Moment style={styles.lastSeenText} element={Text} fromNow>
                    {data.user.lastSeen}
                  </Moment>
                </Text>
              </View>
            </View>
            <View style={styles.cardRight}></View>
          </View>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  usernameContainer: {
    paddingHorizontal: 10,
  },
  usernameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  lastSeenText: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: colors.textLight,
  },
  cardRight: {},
});

export default ChatCardComponent;
