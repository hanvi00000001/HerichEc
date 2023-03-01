import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../global/styles';
import Loader from '../common/Loader';
import {Icon, SocialIcon, Button} from '@rneui/themed';

export default function UserLogin({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const adminLogin = async () => {
    setModalVisible(true);
    firestore()
      .collection('users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setModalVisible(false);
        Alert.alert('Thông báo', 'Đăng nhập thành công!');
        /* ... */
        console.log(querySnapshot.docs);
        if (querySnapshot.docs[0]._data !== null) {
          if (
            querySnapshot.docs[0]._data.email === email &&
            querySnapshot.docs[0]._data.password === password
          ) {
            goToNextScreen(
              querySnapshot.docs[0]._data.userId,
              querySnapshot.docs[0]._data.mobile,
              querySnapshot.docs[0]._data.name,
            );
          }
        }
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error);
        Alert.alert(
          'Thông Báo',
          'Tên tài khoản của bạn hoặc Mật khẩu không đúng!',
        );
      });
  };

  const goToNextScreen = async (userId, mobile, name) => {
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    await AsyncStorage.setItem('MOBILE', mobile);
    await AsyncStorage.setItem('NAME', name);
    navigation.navigate('Home');
  };
  const image = {
    uri: 'https://img2.thuthuatphanmem.vn/uploads/2018/11/30/anh-nen-mau-trang-hong_104324112.jpg',
  };
  const localImage = require('../../images/backgroundtet.png');

  return (
    <ImageBackground
      source={localImage}
      resizeMode="cover"
      style={[styles.container, {height: 700, marginTop: 10, width: '100%'}]}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: 160,
          }}>
          <Image
            source={require('../../images/logo1.png')}
            style={{width: 200, height: 200, alignSelf: 'center'}}
          />
        </View>

        <View
          style={[
            styles.container,
            {top: 60, borderRadius: 40, backgroundColor: '#fff'},
          ]}>
          <Text style={styles.title}>Đăng nhập</Text>

          <View
            style={{flexDirection: 'row', marginLeft: 20, marginBottom: 10}}>
            <Text style={styles.noAccount}>Chưa có tài khoản?</Text>
            <Text
              style={styles.createNewAccount}
              onPress={() => {
                navigation.navigate('UserSignup');
              }}>
              Đăng ký
            </Text>
          </View>
          <View>
            <View style={styles.view10}>
              <View>
                <Icon
                  name="alternate-email"
                  style={styles.email}
                  color={colors.buttonssmall}
                  type="material"
                />
              </View>
              <View style={styles.view11}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={'Nhập Email'}
                  value={email}
                  onChangeText={txt => setEmail(txt)}
                />
              </View>
            </View>

            <View style={styles.view10}>
              <View>
                <Icon
                  name="lock"
                  style={styles.email}
                  color={colors.buttonssmall}
                  type="material"
                />
              </View>

              <View style={[styles.view11, {flexDirection: 'row'}]}>
                <TextInput
                  secureTextEntry={isSecureEntry}
                  style={styles.inputStyle}
                  placeholder={'Nhập mật khẩu'}
                  value={password}
                  onChangeText={txt => setPassword(txt)}
                />
                <Icon
                  style={styles.visibility}
                  type="material"
                  name={isSecureEntry ? 'visibility-off' : 'visibility'}
                  onPress={() => {
                    setIsSecureEntry(prev => !prev);
                  }}
                  // {...isSecureEntry? 'visibility' : 'visibility-off'}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                if (email !== '' && password !== '') {
                  adminLogin();
                } else {
                  Alert.alert('Thông Báo', 'Vui lòng nhập đầy đủ thông tin!');
                }
              }}>
              <Text style={styles.btnText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
                OR
              </Text>
            </View> */}
            {/* <View
              style={{
                marginHorizontal: 10,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <SocialIcon
                title="Facebook"
                button
                type="facebook"
                style={styles.SocialIcon}
                onPress={() => {}}
                iconSize={24}
                iconType="facebook"
              />
              <SocialIcon
                title="Google"
                button
                type="google"
                style={styles.SocialIcon}
                onPress={() => {}}
                iconSize={24}
                iconType="font-awesome"
              />
            </View> */}
          </View>
        </View>

        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ima: {},
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.grey0,
    marginTop: 30,
    marginLeft: 20,
  },
  view10: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    marginLeft: 20,
    marginTop: 20,
    height: 50,
    width: '90%',
  },
  view11: {marginLeft: 30, maxWidth: '65%'},
  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },
  inputStyle: {
    fontSize: 16,
    marginLeft: -20,
    marginBottom: -10,
    color: '#000',
  },
  visibility: {
    width: 50,
    marginLeft: 130,
    top: 20,
  },
  loginBtn: {
    backgroundColor: colors.grey0,
    width: '90%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  createNewAccount: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginLeft: 5,
    alignSelf: 'center',
    color: colors.buttonssmall,
    fontWeight: 'bold',
  },
  noAccount: {
    fontSize: 16,
    alignSelf: 'center',
    color: colors.grey1,
  },
  SocialIcon: {
    height: 50,
    width: '40%',
    borderRadius: 10,
  },
});
