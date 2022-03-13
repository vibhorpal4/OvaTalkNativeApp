import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEditPostMutation} from '../redux/services/postService';
import {useSelector} from 'react-redux';
import ProfileImage from '../assets/images/Profile.svg';
import Moment from 'react-moment';
import InputComponent from '../Components/HOC/InputComponent';

const {width, height} = Dimensions.get('window');

const EditPost = ({navigation, route}: any) => {
  const {post} = route.params;
  const {user} = useSelector((state: any) => state.auth);
  const [editPost, {data, isLoading, isSuccess, error}]: any =
    useEditPostMutation();
  const [caption, setCaption] = useState<string>(post.caption);
  const [errors, setErrors] = useState<string | null>(null);

  if (error) {
    if (error.error) {
      ToastAndroid.show(error.error, ToastAndroid.SHORT);
    } else {
      setErrors(error.data.message);
    }
  }

  if (isSuccess) {
    navigation.goBack();
  }

  const handleSubmit = async (id: any) => {
    const form = new FormData();
    form.append('caption', caption);
    await editPost({id, caption: form});
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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={colors.textDark}
              />
            </Pressable>
            <Text style={styles.headerText}>Edit info</Text>
          </View>
          <View style={styles.headerRight}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Pressable onPress={() => handleSubmit(post._id)}>
                <Ionicons
                  name="checkmark-sharp"
                  color={colors.primaryColor}
                  size={25}
                />
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.postHeader}>
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileStack', {
              screen: 'Profile',
            })
          }>
          <View style={styles.userDetailsWrapper}>
            {post.owner.avatar.url === '' ? (
              <ProfileImage width={40} height={40} />
            ) : (
              <Image
                style={styles.profilePic}
                source={{uri: post.owner.avatar.url}}
              />
            )}
            <Text style={styles.usernameText}>{post.owner.username}</Text>
          </View>
        </Pressable>
        <View style={styles.menuWrapper}>
          <Moment style={styles.createdAt} element={Text} fromNow>
            {post.createdAt}
          </Moment>
        </View>
      </View>
      {errors && <Text style={{color: 'red'}}>{errors}</Text>}
      <View style={styles.imageWrapper}>
        {post.images.length > 1 ? (
          <>
            <FlatList
              data={post.images}
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
            source={{uri: post.images[0].url}}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.captionWrapper}>
        <InputComponent
          placeHolder="Caption..."
          onChangeText={(caption: any) => setCaption(caption)}
          value={caption}
          multiline
          //   numberOfLines={6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    color: colors.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.textDark,
    paddingHorizontal: 25,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  menuWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createdAt: {
    fontFamily: 'Poppins-Light',
    color: colors.textDark,
    fontSize: 10,
  },
  imageWrapper: {},
  image: {
    width,
    height: 500,
  },
  captionWrapper: {
    marginVertical: 20,
  },
});

export default EditPost;
