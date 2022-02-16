import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ButtonComponent from '../Components/HOC/ButtonComponent';
import {logoutState} from '../redux/authSlice';
import {useGetMyProfileQuery} from '../redux/services/profileService';
import {
  useFollowUserMutation,
  useGetUserQuery,
  useUnFollowUserMutation,
} from '../redux/services/userService';
import {useLogoutQuery} from '../redux/services/authService';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import colors from '../assets/colors/colors';
import ProfileCard from '../Components/ProfileCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useGetUserPostsQuery} from '../redux/services/postService';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNRstart from 'react-native-restart';
import Camera from '../assets/images/Camera.svg';
import Modal from 'react-native-modal';

const User = ({route, navigation}: any) => {
  const {username} = route.params;
  const reqUser = useSelector((state: any) => state.profile.user);
  const user: any = useGetUserQuery(username);
  const dispatch = useDispatch();
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const [isFllow, setIsFollow] = useState<boolean>(false);
  const Unfollow: any = useUnFollowUserMutation();
  const Follow: any = useFollowUserMutation();

  useEffect(() => {
    if (user.isLoading) {
      <ActivityIndicator />;
    } else {
      if (user.data.user.followers.includes(reqUser._id)) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    }
  }, [user.isSuccess]);

  const handleFollowUser = async () => {
    await Follow[0](user.data.user.username);
    setIsFollow(true);
  };

  const handleUnFollowUser = async () => {
    await Unfollow[0](user.data.user.username);
    setIsFollow(false);
  };

  const renderPosts = (postData: any) => {
    return postData.posts.map((post: any) => (
      <Image
        key={post._id}
        style={styles.postImage}
        source={{uri: post.images[0].url}}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModelOpen}
        onBackdropPress={() => setIsModelOpen(!isModelOpen)}
        onBackButtonPress={() => setIsModelOpen(!isModelOpen)}
        avoidKeyboard={true}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={styles.modelWrapper}>
        <View style={styles.model}></View>
      </Modal>
      {user.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.header}>
            <Pressable
              onPress={() =>
                navigation.navigate('HomeStack', {
                  screen: 'Home',
                })
              }>
              <Ionicons name="chevron-back" size={25} color={colors.textDark} />
            </Pressable>
            <Text style={styles.usernameText}>{user.data.user.username}</Text>
            <Pressable>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={colors.textDark}
              />
            </Pressable>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={user.isLoading}
                onRefresh={user.refetch}
              />
            }>
            <View style={styles.profileWrapper}>
              <ProfileCard
                user={user.data.user}
                toFollowers={() =>
                  navigation.navigate('Followers', {
                    username: user.data.user.username,
                  })
                }
                toFollowings={() =>
                  navigation.navigate('Followings', {
                    username: user.data.user.username,
                  })
                }
              />
            </View>
            <View style={styles.followUnfollow}>
              {Follow[1].error && (
                <Text style={styles.error}>{Follow[1].error.data.message}</Text>
              )}
              {Unfollow[1].error && (
                <Text style={styles.error}>
                  {Unfollow[1].error.data.message}
                </Text>
              )}
              {isFllow ? (
                <ButtonComponent
                  title="Unfollow"
                  onPress={handleUnFollowUser}
                  outlinedFullWidth
                  isLoading={Unfollow[1].isLoading}
                />
              ) : (
                <ButtonComponent
                  title="Follow"
                  onPress={handleFollowUser}
                  primaryFullWidth
                  isLoading={Follow[1].isLoading}
                />
              )}
            </View>
            <SafeAreaView style={styles.postsWrapper}>
              {user.data.posts.isLoading ? (
                <View style={styles.noPostWrapper}>
                  <ActivityIndicator />
                </View>
              ) : (
                <>
                  {user.data.posts.length === 0 ? (
                    <View style={styles.noPostWrapper}>
                      <Camera width={200} height={200} />
                      <Text style={styles.noPostText}>No Posts</Text>
                    </View>
                  ) : (
                    renderPosts(user.data)
                  )}
                </>
              )}
            </SafeAreaView>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundColor,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
  },
  usernameText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 20,
  },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followUnfollow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  postsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  postImage: {
    width: '33.13%',
    height: 135,
    marginHorizontal: '0.1%',
    marginVertical: '0.1%',
  },
  noPostWrapper: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 80,
  },
  noPostText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: colors.textLight,
  },
  modelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  model: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
  },
  error: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
  },
});

export default User;
