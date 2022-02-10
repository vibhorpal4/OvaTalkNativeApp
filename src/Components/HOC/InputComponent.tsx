import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';

const InputComponent = ({
  autoComplete,
  keyboardType,
  onChangeText,
  placeHolder,
  secureTextEntry,
  value,
  label,
}: any) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      {label && <Text style={styles.label}>{label} :</Text>}
      <TextInput
        style={styles.input}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeHolder}
        secureTextEntry={false || secureTextEntry}
        value={value}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  input: {
    minWidth: '70%',
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.textDark,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 1,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
  },
});

export default InputComponent;
