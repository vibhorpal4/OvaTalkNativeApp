import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';

const ButtonComponent = ({title, onPress, icon}: any) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {icon ? icon : null}
        <Text style={styles.title}> {title}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    color: 'white',
    height: 40,
    width: 120,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: 5,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});

export default ButtonComponent;
