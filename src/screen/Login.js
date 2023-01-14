import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminLogin = async () => {
    const users = await firestore().collection('admin').get();
    console.log(users.password + '  ' + password);
    if (
      email == users.docs[0]._data.email &&
      password == users.docs[0]._data.password
    ) {
      navigation.navigate('Dashboard');
      await AsyncStorage.setItem('EMAIL'.email);
    } else {
      alert('wrong email/password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Nhập Email'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Nhập mật khẩu'}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            Alert.alert('THÔNG BÁO', 'Vui lòng điền đầy đủ thông tin!');
          }
        }}>
        <Text style={styles.btnText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    alignSelf: 'center',
    marginTop: 100,
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: '#fff',
    width: '60%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.5,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
