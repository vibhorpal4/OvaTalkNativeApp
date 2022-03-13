import React, {useState} from 'react';
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
import {useSearchUserQuery} from '../redux/services/userService';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import colors from '../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersListComponents from '../Components/UsersListComponent';

const {width, height} = Dimensions.get('window');

const SearchResult = () => {
  const [user, setUser] = useState<string>();
  const users: any = useSearchUserQuery(user ?? skipToken);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchWrapper}>
        {/* <Pressable>
          <Ionicons name="chevron-back" size={25} color={colors.textDark} />
        </Pressable> */}
        <Ionicons name="search" size={20} color={colors.textLight} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor={colors.textLight}
          onChangeText={user => setUser(user)}
          value={user}
        />
      </SafeAreaView>
      <View style={styles.listWrapper}>
        {users.isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.listWrapper}>
            {users.data?.users.length === 0 ? (
              <View style={styles.noUsers}>
                <Text style={styles.headerText}>No User</Text>
              </View>
            ) : (
              <>
                {users.isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <UsersListComponents
                    users={users.data?.users}
                    isLoading={users.isLoading}
                    refresh={users.refetch}
                  />
                )}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    width: width,
    height: height,
  },

  searchWrapper: {
    backgroundColor: 'white',
    // minHeight: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
    width: '92%',
    borderRadius: 10,
  },
  searchBar: {
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 40,
    width: '90%',
    marginHorizontal: -30,
    marginRight: 2,
    color: colors.textLight,
    borderRadius: 2,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlignVertical: 'center',
    paddingVertical: 13,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: colors.textDark,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  listWrapper: {
    height: '100%',
    width: '100%',
    paddingTop: 15,
  },
  noUsers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
});

export default SearchResult;
