import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import ChatCard from '../Components/ChatCard';
import ChatListComponent from '../Components/ChatListComponent';
import {useGetAllChatsQuery} from '../redux/services/chatService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../assets/colors/colors';

const {width, height} = Dimensions.get('window');

const Chats = ({navigation}: any) => {
  const {user} = useSelector((state: any) => state.auth);
  const {data, isSuccess, isLoading, error, refetch} =
    useGetAllChatsQuery(undefined);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() =>
              navigation.navigate('HomeStack', {
                screen: 'Home',
              })
            }>
            <Ionicons name="chevron-back" size={25} color={colors.textDark} />
          </Pressable>
          <Text style={styles.usernameText}>{user.username}</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable>
            <Entypo name="new-message" size={20} color={colors.textDark} />
          </Pressable>
        </View>
      </View>
      <SafeAreaView style={styles.searchContainer}>
        <Ionicons name="search" size={15} color={colors.textLight} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Chat"
          placeholderTextColor={colors.textLight}
          // onChangeText={user => setUser(user)}
          value={user}
        />
      </SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ChatListComponent
          chats={data.chats}
          isLoading={isLoading}
          refresh={refetch}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  headerRight: {},
  searchContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    width: '92%',
    borderRadius: 10,
  },
  searchBar: {
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 40,
    width: '95%',
    marginHorizontal: -30,
    marginRight: 2,
    color: colors.textLight,
    borderRadius: 2,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
});

export default Chats;
