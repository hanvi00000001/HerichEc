import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../global/styles';
import Swiper from 'react-native-swiper';

export default function SelectLogin({navigation}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 200,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Image
            source={require('../../images/logo1.png')}
            style={{width: 200, height: 200, alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: 400, backgroundColor: '#000'}}>
        <Image
          source={require('../../images/bannerwelcomscreen.png')}
          style={{
            width: '100%',
            height: 400,
          }}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('UserLogin');
          }}>
          <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 40}}>
        <Text style={styles.noAccount}>Chưa có tài khoản?</Text>
        <Text
          style={styles.createNewAccount}
          onPress={() => {
            navigation.navigate('UserSignup');
          }}>
          Đăng ký ngay
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f5ee',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey1,
  },
  btn: {
    backgroundColor: colors.buttonssmall,
    height: 50,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    fontSize: 20,
    color: colors.headerText,
    fontWeight: 'bold',
  },
  createNewAccount: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
    marginLeft: 5,
    alignSelf: 'center',
    color: colors.buttonssmall,
    fontWeight: 'bold',
  },
  noAccount: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'center',
    color: colors.grey1,
  },
});
