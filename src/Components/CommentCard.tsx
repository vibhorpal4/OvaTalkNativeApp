import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
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
import Modal from 'react-native-modal';
import ButtonComponent from './HOC/ButtonComponent';
import {useDeleteCommentMutation} from '../redux/services/commentServices';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
const CommentCard = ({comment}: any) => {
  const navigation: any = useNavigation();
  const {user} = useSelector((state: any) => state.auth);
  const deleteComment = useDeleteCommentMutation();
  const bottomSheet = useRef();

  const handleDelete = async (id: any) => {
    deleteComment[0](id);
  };

  return (
    <View>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={height / 4}>
        <View style={styles.model}>
          <Pressable
            style={styles.modelButtonWrapper}
            onPress={() => handleDelete(comment._id)}>
            <AntDesign name="delete" size={25} color={colors.primaryColor} />
            <Text style={styles.modelText}>Delete Comment</Text>
          </Pressable>
        </View>
      </BottomSheet>
      <Pressable onLongPress={() => bottomSheet.current.show()}>
        <View style={styles.commentWrapper}>
          <View style={styles.leftSide}>
            <Pressable
              onPress={() => {
                user.username === comment.owner.username
                  ? navigation.navigate('ProfileStack', {
                      screen: 'Profile',
                    })
                  : navigation.navigate('UserStack', {
                      screen: 'User',
                      params: {username: comment.owner.username},
                    });
              }}>
              {comment.owner.avatar.url === '' ? (
                <ProfileImage width={40} height={40} />
              ) : (
                <Image
                  style={styles.profilePic}
                  source={{uri: comment.owner.avatar.url}}
                />
              )}
            </Pressable>
            <Text style={styles.username}>
              {comment.owner.username}
              <Text style={styles.commentText}> {comment.title}</Text>
            </Text>
          </View>
          <View style={styles.rightSide}></View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  commentWrapper: {
    width: width,
    color: colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 8,
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '85%',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: colors.textDark,
    paddingHorizontal: 3,
  },
  commentText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.textDark,
  },
  rightSide: {},
  modelWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    color: colors.primaryColor,
    marginHorizontal: 8,
  },
});

export default CommentCard;
