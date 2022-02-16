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
import ButtonComponent from './HOC/ButtonComponent';
import ProfileImage from '../assets/images/Profile.svg';
import colors from '../assets/colors/colors';
import {useSelector} from 'react-redux';
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '../redux/services/userService';
import {useNavigation} from '@react-navigation/native';

const UsersListComponents = ({users, isLoading, refresh}: any) => {
  const {user} = useSelector((state: any) => state.profile);
  const navigation: any = useNavigation();

  const renderUser = ({item}: any) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('UserStack', {
            screen: 'User',
            params: {
              username: item.username,
            },
          })
        }>
        <View style={styles.itemWrapper}>
          <View style={styles.userDataWrapper}>
            {item.avatar.url ? (
              <Image
                style={styles.profilePic}
                source={{uri: item.avatar.url}}
                resizeMode="cover"
              />
            ) : (
              <ProfileImage width={50} height={50} />
            )}
            <View style={styles.nameWrapper}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={item => item._id}
          refreshing={isLoading}
          onRefresh={refresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  userDataWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  usernameText: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
    fontSize: 15,
    textAlign: 'left',
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
    fontSize: 12,
    textAlign: 'left',
  },
});

export default UsersListComponents;
