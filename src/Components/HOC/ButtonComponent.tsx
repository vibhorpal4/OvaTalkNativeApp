import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';

const ButtonComponent = ({
  title,
  onPress,
  icon,
  primary,
  outlined,
  primaryFullWidth,
  outlinedFullWidth,
  isLoading,
}: any) => {
  return (
    <SafeAreaView>
      {primary && (
        <TouchableOpacity style={styles.primary} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {icon ? icon : null}
              <Text style={styles.title}> {title}</Text>
            </>
          )}
        </TouchableOpacity>
      )}
      {primaryFullWidth && (
        <TouchableOpacity style={styles.primaryFullWidth} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {icon ? icon : null}
              <Text style={styles.title}> {title}</Text>
            </>
          )}
        </TouchableOpacity>
      )}
      {outlined && (
        <TouchableOpacity style={styles.outlined} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {icon ? icon : null}
              <Text style={styles.outlinedTitle}> {title}</Text>
            </>
          )}
        </TouchableOpacity>
      )}
      {outlinedFullWidth && (
        <TouchableOpacity style={styles.outlinedFullWidth} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              {icon ? icon : null}
              <Text style={styles.outlinedTitle}> {title}</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  primary: {
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
  primaryFullWidth: {
    backgroundColor: colors.primaryColor,
    color: 'white',
    height: 40,
    minWidth: '90%',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  outlined: {
    backgroundColor: colors.backgroundColor,
    color: 'white',
    height: 40,
    width: 120,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primaryColor,
    borderWidth: 1,
    textAlign: 'center',
  },
  outlinedFullWidth: {
    backgroundColor: colors.backgroundColor,
    color: colors.primaryColor,
    height: 40,
    minWidth: '90%',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    textAlign: 'center',
  },
  title: {
    paddingHorizontal: 5,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  outlinedTitle: {
    paddingHorizontal: 5,
    color: colors.primaryColor,
    fontFamily: 'Poppins-Bold',
  },
});

export default ButtonComponent;
