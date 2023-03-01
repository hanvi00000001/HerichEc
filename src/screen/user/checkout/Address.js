import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../global/styles';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Icon} from '@rneui/themed';

export default function Address({navigation}) {
  const [addressList, setAddressList] = useState([]);
  const isFocused = useIsFocused();
  const [selectedAddress, setSelectedAddress] = useState('');
  useEffect(() => {
    getAddressList();
  }, [isFocused]);

  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.map(item => {
      if (item.addressId == addressId) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setAddressList(tempDart);
  };
  const saveDefaultAddress = async item => {
    await AsyncStorage.setItem('ADDRESS', item.addressId);
    let tempDart = [];
    tempDart = addressList;
    tempDart.map(itm => {
      if (itm.addressId == item.addressId) {
        itm.selected = true;
      } else {
        itm.selected = false;
      }
    });

    let temp = [];

    tempDart.map(item => {
      temp.push(item);
    });
    setAddressList(temp);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.addressItem,
                {marginBottom: index == addressList.length - 1 ? 100 : 10},
              ]}>
              <View>
                <Text style={styles.textAddressname}>{item.fname}</Text>
                <Text style={styles.textAddress}>{item.street}</Text>
                <Text style={styles.textAddress}>{item.ward}</Text>
                <Text style={styles.textAddress}>{item.district}</Text>
                <Text style={styles.textAddress}>{item.city}</Text>
                <Text style={styles.textAddress}>{item.mobile}</Text>
              </View>
              {item.selected == true ? (
                <Text>Mặc định</Text>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    saveDefaultAddress(item);
                  }}>
                  <Text style={{color: colors.buttons, fontWeight: 'bold'}}>
                    Mặc định
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddNewAddress');
        }}>
        <Icon name="add" size={60} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textAddressname: {
    color: colors.grey0,
    fontWeight: 'bold',
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    //backgroundColor: colors.grey0,
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
  addressItem: {
    width: '90%',

    backgroundColor: '#fff',
    elevation: 4,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.buttons,
    marginBottom: -80,
  },
  textAddress: {
    color: colors.grey0,
  },
});
