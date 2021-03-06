import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import UserListCard from './UserListCard';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const UsersListComponents = ({users, isLoading, refresh}: any) => {
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
            {users?.map((user: any) => (
              <UserListCard key={user._id} item={user} />
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

export default UsersListComponents;
