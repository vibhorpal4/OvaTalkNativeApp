import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import ProfileImage from '../assets/images/Profile.svg';
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '../redux/services/userService';

const {width, height} = Dimensions.get('window');

const NotificationCard = ({item}: any) => {
  const Follow: any = useFollowUserMutation();
  const UnFollow: any = useUnFollowUserMutation();
  const [isFollow, setIsFollow] = useState<boolean>(
    item.reciver.followings.includes(item.sender._id) ? true : false,
  );
  const navigation: any = useNavigation();

  const handleFollow = async (username: any) => {
    setIsFollow(!isFollow);
    await Follow[0](username);
  };

  const handleUnFollow = async (username: any) => {
    setIsFollow(!isFollow);
    await UnFollow[0](username);
  };
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.senderAndNotificaionsDetails}>
        <Pressable
          onPress={() =>
            navigation.navigate('UserStack', {
              screen: 'User',
              params: {username: item.sender.username},
            })
          }>
          {item.sender.avatar.url ? (
            <Image
              source={{uri: item.sender.avatar.url}}
              style={styles.senderProfilePic}
            />
          ) : (
            <ProfileImage width={50} height={50} />
          )}
        </Pressable>
        <Text style={styles.text}>{item.text}</Text>
      </View>
      {item.post && (
        <View style={styles.postWrapper}>
          <Image
            style={styles.postImage}
            source={{uri: item.post.images[0].url}}
          />
        </View>
      )}
      <View>
        {item.text === `${item.sender.username} started following you` && (
          <>
            {isFollow ? (
              <>
                <Pressable
                  style={styles.followButton}
                  onPress={() => handleUnFollow(item.sender.username)}>
                  <Text style={styles.followText}>Unfollow</Text>
                </Pressable>
              </>
            ) : (
              <>
                {item.reciver.followers.includes(item.sender._id) ? (
                  <Pressable
                    style={styles.followButton}
                    onPress={() => handleFollow(item.sender.username)}>
                    {/* {Follow[1].isLoading ? (
                          <ActivityIndicator />
                        ) : ( */}
                    <Text style={styles.followText}>Follow Back</Text>
                    {/* )} */}
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.followButton}
                    onPress={() => handleFollow(item.sender.username)}>
                    {/* {Follow[1].isLoading ? (
                          <ActivityIndicator />
                        ) : ( */}
                    <Text style={styles.followText}>Follow</Text>
                    {/* )} */}
                  </Pressable>
                )}
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: width,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderAndNotificaionsDetails: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
  },
  senderProfilePic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  text: {
    color: colors.textDark,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  postWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: '20%',
  },
  postImage: {
    height: 45,
    width: 45,
  },
  followButton: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.backgroundColor,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    width: 90,
    marginBottom: 10,
  },
  followText: {
    color: colors.primaryColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
  },
});

export default NotificationCard;
