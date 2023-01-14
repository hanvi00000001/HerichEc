import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 4000);
  }, []);
  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log(email);
    navigation.navigate('Dashboard');
    //navigation.navigate('SelectLogin');
    // if (email !== null) {
    //   navigation.navigate('Home');
    // } else {
    //   navigation.navigate('SelectLogin');
    // }
  };
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#fff'}}>
        <Image
          source={require('../images/wellcom.gif')}
          style={{resizeMode: 'cover'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});
