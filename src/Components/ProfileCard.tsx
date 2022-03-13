import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../assets/colors/colors';
import ProfileImage from '../assets/images/Profile.svg';

const ProfileCard = ({user, toFollowers, toFollowings, followers}: any) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.profilePicWrapper}>
        {user?.avatar.url === '' ? (
          <ProfileImage width={80} height={80} />
        ) : (
          <Image style={styles.profilePic} source={{uri: user?.avatar.url}} />
        )}
        <View style={styles.profileDetailsWrapper}>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailsText}>{user?.posts.length}</Text>
            <Text style={styles.profileDetailsTextLabel}>Posts</Text>
          </View>
          <View style={styles.profileDetails}>
            <Pressable
              onPress={toFollowers}
              style={styles.profileDetailsContainer}>
              <Text style={styles.profileDetailsText}>
                {followers ? <>{followers}</> : <>{user?.followers.length}</>}
              </Text>
              <Text style={styles.profileDetailsTextLabel}>Followers</Text>
            </Pressable>
          </View>
          <View style={styles.profileDetails}>
            <Pressable
              style={styles.profileDetailsContainer}
              onPress={toFollowings}>
              <Text style={styles.profileDetailsText}>
                {user?.followings.length}
              </Text>
              <Text style={styles.profileDetailsTextLabel}>Followings</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.userDeatilsWrapper}>
        <Text style={styles.userDetailsText}>{user?.name}</Text>
        <Text style={styles.userDetailsText}>{user?.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: colors.backgroundColor,
    marginTop: 10,
    paddingVertical: 10,
  },
  profilePicWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileDetailsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  profileDetailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetailsText: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
    fontSize: 22,
  },
  profileDetailsTextLabel: {
    fontFamily: 'Poppins-Light',
    color: colors.textDark,
    fontSize: 15,
  },
  userDeatilsWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userDetailsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.textDark,
  },
});

export default ProfileCard;
