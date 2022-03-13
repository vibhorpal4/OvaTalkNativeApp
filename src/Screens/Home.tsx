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
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../assets/colors/colors';
import PostList from '../Components/PostList';
import {getTimelinePosts} from '../redux/postsSlice';
import {useGetTimeLinePostsQuery} from '../redux/services/postService';
import {useGetUserQuery} from '../redux/services/userService';
import Feather from 'react-native-vector-icons/Feather';

const Home = ({navigation}: any) => {
  const {data, isLoading, isSuccess, error, refetch} =
    useGetTimeLinePostsQuery(undefined);
  const dispatch = useDispatch();
  const {timelinePosts} = useSelector((state: any) => state.posts);

  useEffect(() => {
    if (isLoading) {
      <ActivityIndicator />;
    } else {
      dispatch(getTimelinePosts(data));
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.logoText}>OvaTalk</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('ChatStack', {screen: 'Chats'})
              }>
              <Feather name="send" size={25} color={colors.textDark} />
            </Pressable>
          </View>
          {data === undefined && timelinePosts ? (
            <PostList
              data={timelinePosts}
              refresh={refetch}
              isLoading={isLoading}
            />
          ) : (
            <>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <PostList
                    data={data}
                    refresh={refetch}
                    isLoading={isLoading}
                  />
                </>
              )}
            </>
          )}
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
    backgroundColor: colors.backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 22,
  },
});

export default Home;
