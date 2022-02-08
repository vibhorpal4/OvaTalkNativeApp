import React from 'react';
import type {Node} from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import RootStack from './src/navigations/Navigation';

const App: Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
