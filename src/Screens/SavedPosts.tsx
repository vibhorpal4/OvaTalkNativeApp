import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../assets/colors/colors';
import PostCard from '../Components/PostCard';
import PostList from '../Components/PostList';
import {useGetSavedPostsQuery} from '../redux/services/postService';
import {useGetUserQuery} from '../redux/services/userService';

const {width, height} = Dimensions.get('window');

const SavedPosts = ({navigation, route}: any) => {
  const {data, isLoading, isSuccess, error, refetch} =
    useGetSavedPostsQuery(undefined);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Saved Posts</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <PostList data={data} refresh={refetch} isLoading={isLoading} />
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

export default SavedPosts;
