import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import {
  useFollowUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery,
  useUnFollowUserMutation,
} from '../redux/services/userService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersListComponents from '../Components/UsersListComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const Followings = ({route, navigation}: any) => {
  const {username} = route.params;
  const users = useGetUserFollowingsQuery(username);
  const [isOffilne, setIsOffilne] = useState<boolean>(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsOffilne(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={colors.textDark} />
          </Pressable>
          <Text style={styles.headerText}>{username}</Text>
        </View>
      </SafeAreaView>
      {isOffilne ? (
        <Text style={{color: colors.textDark}}>No internet</Text>
      ) : (
        <>
          {users.isLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.listWrapper}>
              {users.data.followings.length === 0 ? (
                <View style={styles.noUsers}>
                  <Text style={styles.headerText}>No Followers</Text>
                </View>
              ) : (
                <>
                  {users.isLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <UsersListComponents
                      users={users.data.followings}
                      isLoading={users.isLoading}
                      refresh={users.refetch}
                    />
                  )}
                </>
              )}
            </View>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  listWrapper: {
    height: '100%',
    width: '100%',
    paddingTop: 15,
  },
  noUsers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Followings;
