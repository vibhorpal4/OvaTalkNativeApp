import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChatCardComponent from './ChatCardComponent';
import UserListCard from './UserListCard';

const {width, height} = Dimensions.get('window');

const ChatListComponent = ({chats, isLoading, refresh}: any) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refresh} />
            }>
            {chats?.map((chat: any) => (
              <ChatCardComponent key={chat._id} item={chat} />
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});

export default ChatListComponent;
