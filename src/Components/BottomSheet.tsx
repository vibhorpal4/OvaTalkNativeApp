import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from '../assets/colors/colors';

const {width, height} = Dimensions.get('window');

const BottomSheet = ({childern}: any) => {
  return <View style={styles.conatiner}>{childern}</View>;
};

const styles = StyleSheet.create({
  conatiner: {
    position: 'absolute',
    width,
    height: height / 3,
    zIndex: 100,
    left: 0,
    right: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.backgroundColor,
  },
});

export default BottomSheet;
