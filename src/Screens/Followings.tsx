import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersListComponents from '../Components/UsersListComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useGetUserFollowingsQuery,
  useUnFollowUserMutation,
} from '../redux/services/userService';

const Followings = ({route, navigation}: any) => {
  const {username} = route.params;
  const users = useGetUserFollowingsQuery(username);
  const [followUser, {isLoading, isSuccess, error}] = useUnFollowUserMutation();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={colors.textDark} />
          </Pressable>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
      </SafeAreaView>
      {users.isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.listWrapper}>
          {users.data.followings.length === 0 ? (
            <Text style={styles.usernameText}>No Followings</Text>
          ) : (
            <UsersListComponents
              users={users.data.followings}
              isLoading={users.isLoading}
              refresh={users.refetch}
            />
          )}
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  usernameText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  listWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingTop: 15,
  },
});

export default Followings;
