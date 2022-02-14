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
} from 'react-native';
import {useDispatch} from 'react-redux';
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
import {useGetMyPostsQuery} from '../redux/services/postService';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNRstart from 'react-native-restart';
import Camera from '../assets/images/Camera.svg';
import Modal from 'react-native-modal';

const Profile = ({route, navigation}: any) => {
  const {username} = route.params;
  const {data, error, isLoading}: any = useGetUserQuery(username);
  const posts = useGetMyPostsQuery(undefined);
  const dispatch = useDispatch();
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(logoutState());
      RNRstart.Restart();
    } catch (error) {
      console.log(error);
    }
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
        <View style={styles.model}>
          <ButtonComponent onPress={handleLogout} title="Logout" />
        </View>
      </Modal>
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
              <Ionicons name="chevron-back" size={25} color={colors.textDark} />
            </Pressable>
            <Text style={styles.usernameText}>{data.user.username}</Text>
            <Pressable onPress={() => setIsModelOpen(true)}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={colors.textDark}
              />
            </Pressable>
          </View>
          <View style={styles.profileWrapper}>
            <ProfileCard user={data.user} />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UpdateProfile', {
                username: data.user.username,
              })
            }
            style={styles.editProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          <ScrollView>
            <SafeAreaView style={styles.postsWrapper}>
              {posts.isLoading ? (
                <View style={styles.noPostWrapper}>
                  <ActivityIndicator />
                </View>
              ) : (
                <>
                  {posts.data.posts.length === 0 ? (
                    <View style={styles.noPostWrapper}>
                      <Camera width={200} height={200} />
                      <Text style={styles.noPostText}>No Posts</Text>
                    </View>
                  ) : (
                    renderPosts(posts.data)
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
    marginHorizontal: 20,
    backgroundColor: colors.backgroundColor,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },
  editProfileText: {
    fontFamily: 'Poppins-Bold',
    color: colors.primaryColor,
  },
  postsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
  },
  postImage: {
    width: 125,
    height: 125,
    marginHorizontal: 1,
    marginVertical: 1,
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
});

export default Profile;
