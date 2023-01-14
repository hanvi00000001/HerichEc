import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Loader from '../common/Loader';
import {colors} from '../../global/styles';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {Icon, SocialIcon} from '@rneui/themed';

export default function UserSignup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [badName, setBadName] = useState(false);
  const [mobile, setMobile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const saveUser = () => {
    setModalVisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
        cart: [],
        wish: [],
        address: [],
        profilePic: '',
      })
      .then(res => {
        setModalVisible(false);
        navigation.navigate('UserLogin');
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error);
      });
  };
  const image = {
    uri: 'https://www.gifss.com/fuego/artificiales/images/fuegos-artificiales-05.gif',
  };
  const localImage = require('../../images/backgroundtet.png');
  return (
    <ImageBackground
      source={localImage}
      resizeMode="cover"
      style={[styles.container, {height: 700, width: '100%', marginTop: 5}]}>
      <View>
        <View
          style={{
            width: '100%',
            height: 160,
          }}>
          <Image
            source={require('../../images/logo1.png')}
            style={{width: 200, height: 160, alignSelf: 'center'}}
          />
        </View>
      </View>

      <View
        style={[
          styles.container,
          {top: 30, borderRadius: 40, backgroundColor: '#fff'},
        ]}>
        <Text style={styles.title}>Đăng ký</Text>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <Text style={styles.noAccount}>Đã có tài khoản?</Text>
          <Text
            style={styles.createNewAccount}
            onPress={() => {
              navigation.navigate('UserLogin');
            }}>
            Đăng nhập
          </Text>
        </View>
        <View>
          {}
          <View style={styles.view10}>
            <View>
              <Icon
                name="person"
                style={styles.email}
                color={colors.buttonssmall}
                type="material"
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                style={styles.inputStyle}
                placeholder={'Tên'}
                value={name}
                onChangeText={txt => setName(txt)}
              />
            </View>
          </View>

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
                keyboardType="email-address"
                style={styles.inputStyle}
                placeholder={'Email'}
                value={email}
                onChangeText={txt => setEmail(txt)}
              />
            </View>
          </View>
          <View style={styles.view10}>
            <View>
              <Icon
                name="phone"
                style={styles.email}
                color={colors.buttonssmall}
                type="material"
              />
            </View>
            <View style={styles.view11}>
              <TextInput
                style={styles.inputStyle}
                placeholder={'Số điện thoại'}
                keyboardType={'number-pad'}
                value={mobile}
                maxLength={10}
                onChangeText={txt => setMobile(txt)}
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
                placeholder={'Mật khẩu'}
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
              if (
                email !== '' &&
                password !== '' &&
                name !== '' &&
                mobile !== '' &&
                mobile.length > 9
              ) {
                saveUser();
              } else {
                Alert.alert(
                  'THÔNG BÁO',
                  'Vui lòng điền đầy đủ thông tin đăng ký!',
                );
              }
            }}>
            <Text style={styles.btnText}>Đăng Ký</Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
              OR
            </Text>
          </View>
          <View
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
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.grey0,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  view10: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#563285',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 10,
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
    alignSelf: 'center',
  },
  visibility: {
    width: 50,
    marginLeft: 170,
    top: 20,
  },
  loginBtn: {
    backgroundColor: '#D83E64',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
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
