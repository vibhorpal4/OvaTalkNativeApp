import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../assets/colors/colors';
import {useSelector} from 'react-redux';
import {useGetUserQuery} from '../redux/services/userService';
import PostCard from './PostCard';

const {width, height} = Dimensions.get('window');
const PostList = ({data, refresh, isLoading}: any) => {
  const reqUser = useSelector((state: any) => state.auth.user);
  const user = useGetUserQuery(reqUser.username);

  return (
    <View style={styles.container}>
      {user.isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refresh} />
            }>
            {data.posts.map((post: any) => (
              <PostCard key={post._id} item={post} user={user.data.user} />
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    width: width,
    height: height,
    paddingBottom: 130,
  },
});

export default PostList;
