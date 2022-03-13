import {skipToken} from '@reduxjs/toolkit/dist/query';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import InputComponent from '../Components/HOC/InputComponent';
import {useSearchUserQuery} from '../redux/services/userService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetAllPostsQuery} from '../redux/services/postService';
import {getAllPosts} from '../redux/postsSlice';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const {width, height} = Dimensions.get('window');

const Search = ({navigation}: any) => {
  const posts = useGetAllPostsQuery(undefined);
  const dispatch = useDispatch();

  const {allPosts} = useSelector((state: any) => state.posts);

  useEffect(() => {
    if (posts.isLoading) {
      // <ActivityIndicator />
    } else {
      dispatch(getAllPosts(posts.data));
    }
  }, [posts.isSuccess]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('SearchResult')}>
        <SafeAreaView style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color={colors.textLight} />
          <Text style={styles.searchBarText}>Search</Text>
        </SafeAreaView>
      </Pressable>
      <View>
        {posts.data === undefined && allPosts ? (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl
                  onRefresh={posts.refetch}
                  refreshing={posts.isLoading}
                />
              }>
              <Pressable
                style={styles.postsWrapper}
                onPress={() => navigation.navigate('Explore')}>
                {allPosts.posts.map((post: any) => (
                  <Image
                    key={post._id}
                    style={styles.postImage}
                    source={{uri: post.images[0].url}}
                  />
                ))}
              </Pressable>
            </ScrollView>
          </>
        ) : (
          <>
            {posts.isLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      onRefresh={posts.refetch}
                      refreshing={posts.isLoading}
                    />
                  }>
                  <Pressable
                    style={styles.postsWrapper}
                    onPress={() => navigation.navigate('Explore')}>
                    {posts.data.posts.map((post: any) => (
                      <Image
                        key={post._id}
                        style={styles.postImage}
                        source={{uri: post.images[0].url}}
                      />
                    ))}
                  </Pressable>
                </ScrollView>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    width: width,
    height: height,
  },

  searchWrapper: {
    backgroundColor: 'white',
    // minHeight: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
    width: '92%',
    borderRadius: 10,
  },
  searchBarText: {
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 40,
    width: '90%',
    marginHorizontal: -30,
    marginRight: 2,
    color: colors.textLight,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlignVertical: 'center',
    paddingVertical: 13,
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
});

export default Search;
