import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
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
import {useGetUserQuery} from '../redux/services/userService';
import {useLogoutQuery} from '../redux/services/authService';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import colors from '../assets/colors/colors';
import ProfileCard from '../Components/ProfileCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import {useGetUserPostsQuery} from '../redux/services/postService';
import {SafeAreaView} from 'react-native-safe-area-context';
import Camera from '../assets/images/Camera.svg';
import Modal from 'react-native-modal';
import {removeAllPosts, removeTimelinePosts} from '../redux/postsSlice';
import socket from '../../socketClient';
import BottomSheet from 'react-native-gesture-bottom-sheet';

const {height, width} = Dimensions.get('window');

const Profile = ({route, navigation}: any) => {
  const {username} = route.params;
  const {data, error, isLoading, refetch}: any = useGetUserQuery(username);
  const {user} = useSelector((state: any) => state.auth);
  const bottomSheet = useRef();

  const renderPosts = (postData: any) => {
    return postData?.posts.map((post: any) => (
      <Image
        key={post._id}
        style={styles.postImage}
        source={{uri: post.images[0].url}}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={height / 2.25}>
        <View style={styles.model}>
          <Pressable
            style={styles.modelButtonWrapper}
            onPress={() => navigation.navigate('SavedPosts')}>
            <Ionicons name="bookmark" size={25} color={colors.textDark} />
            <Text style={styles.modelText}>Saved</Text>
          </Pressable>
        </View>
      </BottomSheet>

      {isLoading ? (
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
              <Ionicons name="chevron-back" size={30} color={colors.textDark} />
            </Pressable>
            {data === undefined && user ? (
              <Text style={styles.usernameText}>{user.username}</Text>
            ) : (
              <Text style={styles.usernameText}>{data?.user.username}</Text>
            )}
            <Pressable
              //  onPress={() => setIsModelOpen(true)}
              onPress={() => bottomSheet.current.show()}>
              <Ionicons name="menu" size={30} color={colors.textDark} />
            </Pressable>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.profileWrapper}>
              {data === undefined && user ? (
                <>
                  <ProfileCard
                    user={user}
                    toFollowers={() =>
                      navigation.navigate('Followers', {
                        username: user.username,
                      })
                    }
                    toFollowings={() =>
                      navigation.navigate('Followings', {
                        username: user.username,
                      })
                    }
                  />
                </>
              ) : (
                <>
                  <ProfileCard
                    user={data.user}
                    toFollowers={() =>
                      navigation.navigate('Followers', {
                        username: data.user.username,
                      })
                    }
                    toFollowings={() =>
                      navigation.navigate('Followings', {
                        username: data.user.username,
                      })
                    }
                  />
                </>
              )}
            </View>
            <View style={styles.editProfile}>
              <ButtonComponent
                title="Edit Profile"
                onPress={() =>
                  navigation.navigate('UpdateProfile', {
                    username: data?.user.username,
                  })
                }
                outlinedFullWidth
              />
            </View>
            <SafeAreaView style={styles.postsWrapper}>
              {data === undefined ? (
                <>
                  <View style={styles.noPostWrapper}>
                    <Camera width={200} height={200} />
                    <Text style={styles.noPostText}>No Internet</Text>
                  </View>
                </>
              ) : (
                <>
                  {data.posts.isLoading ? (
                    <View style={styles.noPostWrapper}>
                      <ActivityIndicator />
                    </View>
                  ) : (
                    <>
                      {data.posts.length === 0 ? (
                        <View style={styles.noPostWrapper}>
                          <Camera width={200} height={200} />
                          <Text style={styles.noPostText}>No Posts</Text>
                        </View>
                      ) : (
                        <Pressable
                          style={styles.postsWrapper}
                          onPress={() =>
                            navigation.navigate('PostStack', {
                              screen: 'Posts',
                              params: {data: data},
                            })
                          }>
                          {renderPosts(data)}
                        </Pressable>
                      )}
                    </>
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
  editProfile: {
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
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundColor,
    width,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  modelButtonWrapper: {
    paddingVertical: 2,
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: colors.textDark,
    marginHorizontal: 8,
  },
});

export default Profile;
