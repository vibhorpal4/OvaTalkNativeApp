import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

const ChatCard = ({chats}: any) => {
  const {user} = useSelector((state: any) => state.auth);
  const navigation: any = useNavigation();

  let friends: any = [];

  chats.members.map((member: any) => {
    if (member._id !== user._id) {
      friends.push(member);
    }
  });

  return (
    <View>
      {friends.map((friend: any) => (
        <View key={friend._id}>
          <Text>{friend.username}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatCard;
