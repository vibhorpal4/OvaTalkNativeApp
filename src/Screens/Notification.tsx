import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import socket from '../../socketClient';
import colors from '../assets/colors/colors';
import {
  useFollowUserMutation,
  useGetUserNotificationsQuery,
  useUnFollowUserMutation,
} from '../redux/services/userService';
import ProfileImage from '../assets/images/Profile.svg';
import {useDispatch, useSelector} from 'react-redux';
import {setIsRead} from '../redux/notificationSlice';
import NotificationCard from '../Components/NotificationCard';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const Notification = () => {
  const {data, isLoading, error, isSuccess, refetch} =
    useGetUserNotificationsQuery(undefined);
  const {user} = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [notification, setNotification] = useState<any>('');

  useEffect(() => {
    dispatch(setIsRead(true));
  }, [dispatch]);

  useEffect(() => {
    socket.on('Notification', data => {
      setNotification(data);
    });
    socket.emit('NotificationRead', user);
  }, [socket]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl onRefresh={refetch} refreshing={isLoading} />
              }>
              {data.notifications.map((notification: any) => (
                <NotificationCard key={notification._id} item={notification} />
              ))}
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    width: width,
    height: height,
  },
  cardWrapper: {
    width: width,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderAndNotificaionsDetails: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
  },
  senderProfilePic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  text: {
    color: colors.textDark,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  postWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  postImage: {
    height: 45,
    width: 45,
  },
  followButton: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    width: 90,
    marginBottom: 10,
  },
  followText: {
    color: colors.primaryColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
  },
});

export default Notification;
