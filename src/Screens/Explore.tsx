import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import colors from '../assets/colors/colors';
import PostList from '../Components/PostList';
import {getAllPosts} from '../redux/postsSlice';
import {useGetAllPostsQuery} from '../redux/services/postService';

const Explore = () => {
  const {data, isLoading, isSuccess, error, refetch} =
    useGetAllPostsQuery(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      <ActivityIndicator />;
    }
    dispatch(getAllPosts(data));
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          <PostList data={data} refresh={refetch} isLoading={isLoading} />
        </SafeAreaView>
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
    backgroundColor: colors.backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 20,
  },
});

export default Explore;
