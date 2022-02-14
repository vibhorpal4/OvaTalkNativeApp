import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../assets/colors/colors';
import ProfileImage from '../assets/images/Profile.svg';

const ProfileCard = ({user}: any) => {
  const {avatar, name, posts, followers, followings, bio} = user;
  return (
    <View style={styles.wrapper}>
      <View style={styles.profilePicWrapper}>
        {avatar.url === '' ? (
          <ProfileImage width={80} height={80} />
        ) : (
          <Image style={styles.profilePic} source={{uri: avatar.url}} />
        )}
        <View style={styles.profileDetailsWrapper}>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailsText}>{posts.length}</Text>
            <Text style={styles.profileDetailsTextLabel}>Posts</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailsText}>{followers.length}</Text>
            <Text style={styles.profileDetailsTextLabel}>Followers</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileDetailsText}>{followings.length}</Text>
            <Text style={styles.profileDetailsTextLabel}>Followings</Text>
          </View>
        </View>
      </View>
      <View style={styles.userDeatilsWrapper}>
        <Text style={styles.userDetailsText}>{name}</Text>
        <Text style={styles.userDetailsText}>{bio}</Text>
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
