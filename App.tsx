import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//REDUX
import { Provider } from 'react-redux'
import store from './redux/store'

//SCREENS
import MainScreen from './screens/MainScreen';

export default function App() {
  return (
    <Provider store={store}>
        <MainScreen/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
  },
});
