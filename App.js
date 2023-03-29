import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {colors} from './src/global/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({container: {flex: 1}});
