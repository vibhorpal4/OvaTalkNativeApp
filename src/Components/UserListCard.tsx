import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../assets/colors/colors';
import ProfileImage from '../assets/images/Profile.svg';
import {
  useFollowUserMutation,
  useGetUserQuery,
  useUnFollowUserMutation,
} from '../redux/services/userService';
import ButtonComponent from './HOC/ButtonComponent';

const {width, height} = Dimensions.get('window');

const UserListCard = ({item}: any) => {
  const navigation: any = useNavigation();
  const {user} = useSelector((state: any) => state.auth);
  const Follow: any = useFollowUserMutation();
  const UnFollow: any = useUnFollowUserMutation();
  const reqUser = useGetUserQuery(user.username);
  const [isFollow, setIsFollow] = useState<boolean>();

  useEffect(() => {
    if (reqUser.isLoading) {
      <ActivityIndicator />;
    } else {
      if (reqUser.data.user.followings.includes(item._id)) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    }
  }, [reqUser.isSuccess]);

  const handleFollow = async (username: any) => {
    setIsFollow(!isFollow);
    await Follow[0](username);
  };

  const handleUnFollow = async (username: any) => {
    setIsFollow(!isFollow);
    await UnFollow[0](username);
  };

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
            <Text style={styles.nameText}>{item.name && item.name}</Text>
          </View>
        </View>
        {user.username !== item.username && (
          <>
            {isFollow ? (
              <ButtonComponent
                title="unfollow"
                outlined
                onPress={() => handleUnFollow(item.username)}
              />
            ) : (
              <ButtonComponent
                title="follow"
                primary
                onPress={() => handleFollow(item.username)}
              />
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default UserListCard;
