import ReadMore from '@fawazahmed/react-native-read-more';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import Moment from 'react-moment';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../assets/colors/colors';
import {
  useDeletePostMutation,
  useLikePostMutation,
  useSavePostMutation,
} from '../redux/services/postService';
import ProfileImage from '../assets/images/Profile.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import ButtonComponent from './HOC/ButtonComponent';
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '../redux/services/userService';
import BottomSheet from 'react-native-gesture-bottom-sheet';

const {width, height} = Dimensions.get('window');

const PostCard = ({item, user}: any) => {
  const navigation: any = useNavigation();

  const bottomSheet = useRef();
  const Like: any = useLikePostMutation();
  const [totalLikes, setTotalLikes] = useState<number>(item.likes.length);
  const [isLike, setIsLike] = useState<boolean>(
    item.likes.includes(user._id) ? true : false,
  );
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const Follow: any = useFollowUserMutation();
  const UnFollow: any = useUnFollowUserMutation();
  const [isFollow, setIsFollow] = useState<boolean>(
    user.followings.includes(item.owner._id) ? true : false,
  );
  const [isSaved, setIsSaved] = useState<boolean>(
    item.savedBy.includes(user._id) ? true : false,
  );
  const [errors, setErrors] = useState<any>(null);

  const DeletePost: any = useDeletePostMutation();
  const SavePost = useSavePostMutation();

  const randomNumber1: any = Math.floor(Math.random() * item.comments.length);
  const randomNumber2: any = Math.floor(Math.random() * item.comments.length);

  if (Follow[1].error) {
    if (Follow[1].error.error) {
      ToastAndroid.show(Follow[1].error.error, ToastAndroid.SHORT);
    } else {
      setErrors(Follow[1].error.data.message);
    }
  }

  if (UnFollow[1].error) {
    if (UnFollow[1].error.error) {
      ToastAndroid.show(UnFollow[1].error.error, ToastAndroid.SHORT);
    } else {
      setErrors(UnFollow[1].error.data.message);
    }
  }

  if (DeletePost[1].error) {
    if (DeletePost[1].error.error) {
      ToastAndroid.show(DeletePost[1].error.error, ToastAndroid.SHORT);
    } else {
      setErrors(DeletePost[1].error.data.message);
    }
  }

  if (Like[1].error) {
    if (Like[1].error.error) {
      ToastAndroid.show(Like[1].error.error, ToastAndroid.SHORT);
    } else {
      setErrors(Like[1].error.data.message);
    }
  }

  const handleNavigation = (username: any) => {
    if (user.username === username) {
      navigation.navigate('ProfileStack', {
        screen: 'Profile',
      });
    } else {
      navigation.navigate('User', {
        username: username,
      });
    }
  };

  const handleLike = async (id: any) => {
    setIsLike(!isLike);
    setTotalLikes(totalLikes + 1);
    await Like[0](id);
  };

  const handleDislike = async (id: any) => {
    setIsLike(!isLike);
    setTotalLikes(totalLikes - 1);
    await Like[0](id);
  };

  const handleDeletePost = async (id: any) => {
    await DeletePost[0](id);
  };

  const handleFollow = async (username: string) => {
    setIsFollow(!isFollow);
    await Follow[0](username);
  };

  const handleUnFollow = async (username: string) => {
    setIsFollow(!isFollow);
    await UnFollow[0](username);
  };

  const handleSavePost = async (id: any) => {
    setIsSaved(!isSaved);
    await SavePost[0](id);
  };

  const handleUnsavePost = async (id: any) => {
    setIsSaved(!isSaved);
    await SavePost[0](id);
  };

  const imageSlider = ({item}: any) => {
    return (
      <Image
        style={styles.image}
        source={{uri: item.url}}
        resizeMode="contain"
      />
    );
  };

  if (errors) {
    ToastAndroid.show(errors, ToastAndroid.SHORT);
  }

  return (
    <View>
      {user.isLoading ? (
        <View></View>
      ) : (
        <>
          <BottomSheet hasDraggableIcon ref={bottomSheet} height={height / 3}>
            <View style={styles.model}>
              {user._id === item.owner._id ? (
                <>
                  <Pressable
                    style={styles.modelButtonWrapper}
                    onPress={() =>
                      navigation.navigate('PostStack', {
                        screen: 'EditPost',
                        params: {
                          post: item,
                        },
                      })
                    }>
                    <Text style={styles.modelText}>Edit Post</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modelButtonWrapper}
                    onPress={() => handleDeletePost(item._id)}>
                    <Text style={styles.modelText}>Delete Post</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  {isFollow ? (
                    <Pressable
                      style={styles.modelButtonWrapper}
                      onPress={() => handleUnFollow(item.owner.username)}>
                      <Text style={styles.modelText}>Unfollow</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={styles.modelButtonWrapper}
                      onPress={() => handleFollow(item.owner.username)}>
                      <Text style={styles.modelText}>Follow</Text>
                    </Pressable>
                  )}
                </>
              )}
            </View>
          </BottomSheet>

          <View style={styles.postWrapper}>
            {Like[1].error && (
              <Text style={{color: 'red', textAlign: 'center'}}>
                {Like[1].error.data.message}
              </Text>
            )}
            <View style={styles.postHeader}>
              <Pressable onPress={() => handleNavigation(item.owner.username)}>
                <View style={styles.userDetailsWrapper}>
                  {item.owner.avatar.url === '' ? (
                    <ProfileImage width={40} height={40} />
                  ) : (
                    <Image
                      style={styles.profilePic}
                      source={{uri: item.owner.avatar.url}}
                    />
                  )}
                  <Text style={styles.usernameText}>{item.owner.username}</Text>
                </View>
              </Pressable>
              <View style={styles.menuWrapper}>
                <Pressable onPress={() => bottomSheet.current.show()}>
                  <Entypo
                    name="dots-three-vertical"
                    size={15}
                    color={colors.textDark}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.imageWrapper}>
              {item.images.length > 1 ? (
                <>
                  <FlatList
                    data={item.images}
                    keyExtractor={item => item.public_id}
                    renderItem={imageSlider}
                    horizontal={true}
                    // showsHorizontalScrollIndicator={false}
                    indicatorStyle="white"
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={30}
                    initialNumToRender={5}
                  />
                </>
              ) : (
                <Image
                  style={styles.image}
                  source={{uri: item.images[0].url}}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.actionWrapper}>
              <View style={styles.likeWrapper}>
                {isLike ? (
                  <Pressable onPress={() => handleDislike(item._id)}>
                    <AntDesign
                      name="heart"
                      color={colors.primaryColor}
                      size={27}
                    />
                  </Pressable>
                ) : (
                  <Pressable onPress={() => handleLike(item._id)}>
                    <AntDesign
                      name="hearto"
                      color={colors.textDark}
                      size={27}
                    />
                  </Pressable>
                )}
                <Pressable
                  onPress={() =>
                    navigation.navigate('PostStack', {
                      screen: 'Comments',
                      params: {id: item._id},
                    })
                  }>
                  <EvilIcons size={35} name="comment" color={colors.textDark} />
                </Pressable>
                <Pressable>
                  <Feather name="send" color={colors.textDark} size={25} />
                </Pressable>
              </View>
              {isSaved ? (
                <Pressable onPress={() => handleUnsavePost(item._id)}>
                  <Ionicons name="bookmark" size={25} color={colors.textDark} />
                </Pressable>
              ) : (
                <Pressable onPress={() => handleSavePost(item._id)}>
                  <Ionicons
                    name="bookmark-outline"
                    size={25}
                    color={colors.textDark}
                  />
                </Pressable>
              )}
            </View>
            <Text style={styles.totalLikes}>{totalLikes} Likes</Text>

            <View style={styles.captionWrapper}>
              <View>
                <Text style={styles.usernameText}>{item.owner.username}</Text>
              </View>
              <ReadMore
                style={{paddingHorizontal: 10}}
                numberOfLines={1}
                seeMoreContainerStyleSecondary={{position: 'relative'}}
                seeMoreStyle={{
                  color: colors.textLight,
                  fontFamily: 'Poppins-Light',
                  fontSize: 15,
                  marginLeft: -32,
                }}
                seeLessStyle={{
                  color: colors.textLight,
                  fontFamily: 'Poppins-Light',
                  fontSize: 15,
                }}
                seeLessText="see less"
                seeMoreText="...more">
                <Text style={styles.captionText}>{item.caption}</Text>
              </ReadMore>
            </View>
            <View style={styles.commentsWrapper}>
              <Pressable
                onPress={() =>
                  navigation.navigate('PostStack', {
                    screen: 'Comments',
                    params: {id: item._id},
                  })
                }>
                <Text style={styles.viewAllComments}>
                  View all {item.comments.length} comments
                </Text>
              </Pressable>
              <Moment style={styles.createdAt} element={Text} fromNow>
                {item.createdAt}
              </Moment>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    backgroundColor: colors.backgroundColor,
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundColor,
  },
  userDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  usernameText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
  },
  menuWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    // paddingTop: -50,
  },
  image: {
    width: width,
    height: 550,
  },
  actionWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  likeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '30%',
  },
  totalLikes: {
    color: colors.textDark,
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    paddingHorizontal: 15,
  },
  captionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    flexWrap: 'wrap',
  },
  captionText: {
    color: colors.textDark,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  commentsWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllComments: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
  },
  createdAt: {
    fontFamily: 'Poppins-Light',
    color: colors.textLight,
    fontSize: 10,
  },
  modelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: colors.backgroundColor,
  },
  model: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundColor,
    width,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  modelButtonWrapper: {
    paddingVertical: 2,
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.textDark,
    marginHorizontal: 8,
  },
});

export default PostCard;
