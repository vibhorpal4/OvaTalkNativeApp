import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/colors';
import {uploadPost} from '../interfaces/interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUploadPostMutation} from '../redux/services/postService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadPost = ({navigation}: any) => {
  const [post, setPost] = useState<uploadPost>({
    caption: '',
    images: '',
  });
  const [uploadPost, {isLoading, error, isSuccess}]: any =
    useUploadPostMutation();

  if (isSuccess) {
    navigation.navigate('HomeStack', {
      screen: 'Home',
    });
  }

  const selectImage = async () => {
    Alert.alert('Image', 'Choose an option', [
      {text: 'Camera', onPress: onCamera},
      {text: 'Gallery', onPress: onGallery},
      {text: 'Cancel', onPress: () => {}},
    ]);
  };

  const selectMoreImage = async () => {
    Alert.alert('Image', 'Choose an option', [
      {text: 'Camera', onPress: onCamera1},
      {text: 'Gallery', onPress: onGallery1},
      {text: 'Cancel', onPress: () => {}},
    ]);
  };

  const onCamera = async () => {
    const result = await launchCamera({
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setPost({...post, images: result.assets});
  };

  const onGallery = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'mixed',
      selectionLimit: 0,
    });
    setPost({...post, images: result.assets});
  };

  const onCamera1 = async () => {
    const result = await launchCamera({
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
    });
    setPost({...post, images: result.assets?.concat(result.assets)});
  };

  const onGallery1 = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'mixed',
      selectionLimit: 0,
    });
    setPost({...post, images: result.assets?.concat(result.assets)});
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('caption', post?.caption);
    post?.images.forEach((image: any) => {
      formData.append('images', `data:${image.type};base64,${image.base64}`);
    });

    await uploadPost(formData);
    setPost({
      caption: '',
      images: '',
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{paddingVertical: 5}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack', {screen: 'Home'})}>
            <MaterialCommunityIcons
              name="close"
              size={25}
              color={colors.textDark}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Upload Post</Text>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {post?.caption || post?.images ? (
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.upload}>Post</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.uploadDisable}>Post</Text>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.main}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {error && <Text>{error.data.message}</Text>}
        </View>
        <TextInput
          style={styles.caption}
          placeholder="Caption"
          multiline
          numberOfLines={6}
          placeholderTextColor={colors.textLight}
          onChangeText={(caption: string) => setPost({...post, caption})}
        />
        <View style={styles.preview}>
          {post?.images ? (
            <>
              {post.images.map((img: any) => (
                <Image
                  key={img.base64}
                  source={{uri: img.uri}}
                  style={styles.previewImage}
                />
              ))}
              <TouchableOpacity onPress={selectMoreImage}>
                <MaterialCommunityIcons name="plus" size={50} />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.selectImage} onPress={selectImage}>
          <MaterialCommunityIcons name="image" size={25} />
          <Text style={styles.selectImagesTitle}>Select Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.backgroundColor,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 18,
  },
  upload: {
    fontFamily: 'Poppins-Bold',
    color: colors.primaryColor,
    fontSize: 18,
  },
  uploadDisable: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
    fontSize: 18,
  },
  main: {
    paddingVertical: 35,
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
    fontSize: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  preview: {
    display: 'flex',
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  selectImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.textLight,
  },
  selectImagesTitle: {
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
    color: colors.textDark,
    fontSize: 18,
  },
  bottom: {
    paddingVertical: 30,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

export default UploadPost;
