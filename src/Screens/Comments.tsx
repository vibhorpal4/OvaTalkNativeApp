import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '../assets/colors/colors';
import {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
} from '../redux/services/commentServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommentCard from '../Components/CommentCard';
import {useSelector} from 'react-redux';
import socket from '../../socketClient';

const {width, height} = Dimensions.get('window');

const Comments = ({route, navigation}: any) => {
  const {id} = route.params;
  const {user} = useSelector((state: any) => state.auth);
  const [title, setTitle] = useState<string | null>(null);
  const [socketComment, setSocketComment] = useState<any>(null);
  const comments = useGetPostCommentsQuery(id);
  const [createComment, {data, error, isSuccess, isLoading}] =
    useCreateCommentMutation();

  useEffect(() => {
    socket.on('CommentCreate', data => {
      setSocketComment(data);
    });
  }, [socket]);

  if (isSuccess) {
    socket.emit('CommentCreate', data.comment);
  }

  const handleSubmit = async () => {
    const form = new FormData();
    form.append('title', title);
    await createComment({id, title: form});
    setTitle('');
  };

  if (error) {
    if (error.error) {
      Alert.alert('Error', error.error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={colors.textDark} />
          </Pressable>
          <Text style={styles.headerText}>Comments</Text>
        </View>
      </SafeAreaView>
      <View style={styles.main}>
        {comments.isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <SafeAreaView style={styles.listWrapper}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    onRefresh={comments.refetch}
                    refreshing={comments.isLoading}
                  />
                }>
                {error?.data && (
                  <Text style={{color: 'red'}}>{error.data.message}</Text>
                )}
                {comments.data.comments.length === 0 ? (
                  <View style={styles.noComments}>
                    <Text style={styles.headerText}> No Comments</Text>
                  </View>
                ) : (
                  <>
                    {comments.data.comments.map((comment: any) => (
                      <>
                        <CommentCard key={comment._id} comment={comment} />
                      </>
                    ))}
                  </>
                )}

                {socketComment && (
                  <>
                    <CommentCard
                      key={socketComment._id}
                      comment={socketComment}
                    />
                  </>
                )}
              </ScrollView>
            </SafeAreaView>
          </>
        )}
        <View style={styles.commentInputWrapper}>
          <Image source={{uri: user.avatar.url}} style={styles.profilePic} />
          <TextInput
            style={styles.commentInput}
            placeholder="Comment"
            onChangeText={(title: string) => setTitle(title)}
            placeholderTextColor={colors.textLight}
          />
          {title ? (
            <Pressable onPress={handleSubmit}>
              <Text style={styles.postText}>Post</Text>
            </Pressable>
          ) : (
            <Pressable>
              <Text style={styles.postTextDisabled}>Post</Text>
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    color: colors.backgroundColor,
  },
  header: {
    backgroundColor: colors.backgroundColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  main: {
    justifyContent: 'space-between',
  },
  listWrapper: {
    paddingTop: 15,
    height: '78%',
  },
  noComments: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: colors.backgroundColor,
    paddingVertical: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentInput: {
    color: colors.textDark,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    minWidth: '70%',
    maxWidth: '70%',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  postText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.textDark,
  },
  postTextDisabled: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.textLight,
  },
});

export default Comments;
