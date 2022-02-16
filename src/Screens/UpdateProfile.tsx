import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../assets/colors/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetMyProfileQuery} from '../redux/services/profileService';
import ProfileImage from '../assets/images/Profile.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {editProfile} from '../interfaces/interfaces';
import InputComponent from '../Components/HOC/InputComponent';
import PasswordChangeModel from '../Components/PasswordChangeModel';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../redux/services/userService';
import {useSelector} from 'react-redux';

const UpdateProfile = ({route, navigation}: any) => {
  const {username} = route.params;
  // const data = useSelector(state => state.profile);
  const profileData: any = useGetUserQuery(username);
  const [updateUser, {isLoading, isSuccess, error}]: any =
    useUpdateUserMutation();
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<editProfile>({
    name: '',
    username: '',
    email: '',
    avatar: '',
    bio: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (profileData.isLoading) {
      <ActivityIndicator />;
    } else {
      setProfile({
        name: profileData.data.user.name,
        username: profileData.data.user.username,
        email: profileData.data.user.email,
        avatar: profileData.data.user.avatar.url,
        bio: profileData.data.user.bio,
      });
    }
  }, [profileData.isSuccess]);

  if (isSuccess) {
    navigation.navigate('Profile');
  }
  if (error) {
    if (error.error) {
      Alert.alert('Error', error.error);
    }
  }

  const selectImage = async () => {
    Alert.alert('Profile Photo', 'Choose an option', [
      {text: 'Camera', onPress: onCamera},
      {text: 'Gallery', onPress: onGallery},
      {text: 'Cancel', onPress: () => {}},
    ]);
  };

  const onCamera = async () => {
    const result: any = await launchCamera({
      includeBase64: true,
      mediaType: 'photo',
      saveToPhotos: true,
    });
    if (result.didCancel) {
      Alert.alert('Info', 'User close camera without any selection');
    }
    if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
    setProfile({...profile, avatar: result.assets[0]});
    setImagePreview(result.assets[0].uri);
  };

  const onGallery = async () => {
    const result: any = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
    });
    if (result.didCancel) {
      Alert.alert('Info', 'User close gallery without any selection');
    }
    if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
    setProfile({...profile, avatar: result.assets[0]});
    setImagePreview(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    {
      profileData.data.user.name !== profile.name &&
        formData.append('name', profile.name);
    }
    {
      profileData.data.user.username !== profile.username &&
        formData.append('username', profile.username);
    }
    {
      profileData.data.user.email !== profile.email &&
        formData.append('email', profile.email);
    }
    {
      profileData.data.user.bio !== profile.bio &&
        formData.append('bio', profile.bio);
    }
    {
      imagePreview &&
        formData.append(
          'avatar',
          `data:${profile.avatar.type};base64,${profile.avatar.base64}`,
        );
    }
    const username = profileData.data.user.username;
    const user = formData;
    await updateUser({user, username});
  };

  return (
    <View style={styles.container}>
      {profileData.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <MaterialCommunityIcons
                name="close"
                size={25}
                color={colors.textDark}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSubmit}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.done}>Done</Text>
              )}
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.main}>
            <View style={styles.profileContainer}>
              {profile.avatar ? (
                <>
                  {profile.avatar?.uri ? (
                    <Image
                      source={{uri: profile.avatar.uri}}
                      style={styles.profilePic}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={{uri: profileData.data.user.avatar.url}}
                      style={styles.profilePic}
                      resizeMode="cover"
                    />
                  )}
                </>
              ) : (
                <ProfileImage
                  height={150}
                  width={150}
                  color={colors.textLight}
                />
              )}
              <TouchableOpacity
                style={{paddingVertical: 10, marginTop: 5}}
                onPress={selectImage}>
                <Text style={styles.changePhotoText}>Change profile photo</Text>
              </TouchableOpacity>
              {error?.data && (
                <Text style={styles.error}>{error.data.message}</Text>
              )}
              {profileData.error?.data && (
                <Text style={styles.error}>
                  {profileData.error.data.message}
                </Text>
              )}
            </View>
            <View style={styles.formWrapper}>
              <View style={styles.form}>
                <ScrollView>
                  <InputComponent
                    placeHolder="username"
                    onChangeText={(username: string) =>
                      setProfile({...profile, username: username.toLowerCase()})
                    }
                    value={profile.username}
                    helpText="username must be in lowercase"
                  />
                  <InputComponent
                    placeHolder="Name"
                    onChangeText={(name: string) =>
                      setProfile({...profile, name})
                    }
                    value={profile.name}
                  />
                  <InputComponent
                    placeHolder="Email"
                    onChangeText={(email: string) =>
                      setProfile({...profile, email: email.toLowerCase()})
                    }
                    value={profile.email}
                    keyboardType="email-address"
                  />
                  <InputComponent
                    placeHolder="Bio"
                    onChangeText={(bio: string) =>
                      setProfile({...profile, bio})
                    }
                    value={profile.bio}
                    numberOfLines={3}
                    multiline
                  />
                  <TouchableOpacity
                    onPress={() => setIsModelOpen(true)}
                    style={styles.changePassword}>
                    <Text style={styles.changePasswordText}>
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 18,
  },
  done: {
    fontFamily: 'Poppins-Bold',
    color: colors.primaryColor,
    fontSize: 18,
  },
  doneDisable: {
    fontFamily: 'Poppins-Regular',
    color: colors.textLight,
    fontSize: 18,
  },
  main: {
    height: '100%',
    paddingTop: 50,
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  changePhotoText: {
    fontFamily: 'Poppins-Bold',
    color: colors.primaryColor,
  },
  formWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 5,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePassword: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  changePasswordText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.textDark,
  },
  error: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    fontSize: 15,
  },
});

export default UpdateProfile;
