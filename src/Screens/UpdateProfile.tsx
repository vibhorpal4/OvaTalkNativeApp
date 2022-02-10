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

const UpdateProfile: React.FC<any> = ({navigation}) => {
  const [profile, setProfile] = useState<editProfile>({
    name: null,
    username: null,
    email: null,
    avatar: null,
  });
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const {data, isLoading} = useGetMyProfileQuery();

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
    setProfile({...profile, avatar: result.assets[0]});
  };

  const onGallery = async () => {
    const result: any = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'mixed',
    });
    setProfile({...profile, avatar: result.assets[0]});
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('name', profile.name),
      formData.append('username', profile.username),
      formData.append('email', profile.email),
      formData.append(
        'avatar',
        `data:${profile.avatar.type};base64,${profile.avatar.base64}`,
      );

    console.log(formData);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
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
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.main}>
            <View style={styles.profileContainer}>
              {data.user.avatar.url || profile.avatar === null ? (
                <ProfileImage
                  height={150}
                  width={150}
                  color={colors.textLight}
                />
              ) : (
                <Image
                  source={{
                    uri: profile.avatar.uri,
                  }}
                  style={styles.profilePic}
                  resizeMode="cover"
                />
              )}
              <TouchableOpacity
                style={{paddingVertical: 10, marginTop: 5}}
                onPress={selectImage}>
                <Text style={styles.changePhotoText}>Change profile photo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <ScrollView>
                <InputComponent
                  placeHolder="username"
                  onChangeText={(username: string) =>
                    setProfile({...profile, username})
                  }
                  value={profile.username}
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
                    setProfile({...profile, email})
                  }
                  value={profile.email}
                  keyboardType="email-address"
                />
                <TouchableOpacity
                  onPress={() => setIsModelOpen(true)}
                  style={styles.changePassword}>
                  <Text style={styles.changePasswordText}>Change Password</Text>
                </TouchableOpacity>
              </ScrollView>
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
  form: {
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
    paddingVertical: 80,
  },
  changePassword: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  changePasswordText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.textDark,
  },
});

export default UpdateProfile;
