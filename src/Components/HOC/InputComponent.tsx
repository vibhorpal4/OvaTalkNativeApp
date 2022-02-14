import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
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
  helpText,
}: any) => {
  return (
    <SafeAreaView>
      {label && <Text style={styles.label}>{label} :</Text>}
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeHolder}
          secureTextEntry={false || secureTextEntry}
          value={value}
          placeholderTextColor={colors.textLight}
        />
      </View>
      {helpText && <Text style={styles.helpText}>*{helpText}</Text>}
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
    // backgroundColor: colors.backgroundColor,
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
    paddingHorizontal: 10,
    marginBottom: -20,
    marginTop: 20,
    fontSize: 18,
  },
  helpText: {
    color: colors.textLight,
    fontFamily: 'Poppins-Light',
    paddingHorizontal: 10,
    marginTop: -15,
  },
});

export default InputComponent;
