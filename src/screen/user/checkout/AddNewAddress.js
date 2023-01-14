import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../global/styles';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function AddNewAddress({navigation}) {
  const [fname, setFname] = useState('');
  const [street, setStreet] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');

  const saveAddress = async () => {
    const addressId = uuid.v4();
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.push({fname, street, district, city, ward, mobile, addressId});
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        address: tempDart,
      })
      .then(res => {
        console.log('successfully added');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Họ và tên'}
        value={fname}
        onChangeText={txt => setFname(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Địa chỉ cụ thể'}
        value={street}
        onChangeText={txt => setStreet(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Phường/Xã'}
        value={ward}
        onChangeText={txt => setWard(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Quận/Huyện'}
        value={district}
        onChangeText={txt => setDistrict(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Tỉnh/Thành phố'}
        value={city}
        onChangeText={txt => setCity(txt)}
      />

      <TextInput
        style={styles.inputStyle}
        placeholder={'Số điện thoại'}
        value={mobile}
        maxLength={10}
        keyboardType="number-pad"
        onChangeText={txt => setMobile(txt)}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          //   navigation.navigate('AddNewAddress');
          saveAddress();
        }}>
        <Text style={styles.btnText}>Lưu địa chỉ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.headerText,
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    backgroundColor: colors.grey0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: colors.headerText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
