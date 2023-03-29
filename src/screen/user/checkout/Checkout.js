import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Appearance,
} from 'react-native';
import {colors} from '../../../global/styles';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

let userId = '';

export default function Checkout({navigation}) {
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('Chưa có địa chỉ');

  useEffect(() => {
    getCartItems();
    getAddressList();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart);
  };

  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem('ADDRESS');
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.map(item => {
      if (item.addressId == addressId) {
        setSelectedAddress(
          item.fname +
            ', ' +
            item.street +
            ', ' +
            item.ward +
            ', ' +
            item.district +
            ', ' +
            item.city +
            ', ' +
            item.mobile,
        );
      }
    });
  };

  // const getTotal = () => {
  //   let total = 0;
  //   cartList.map(item => {
  //     total = total + item.data.qty * item.data.discountPrice;
  //   });
  //   return total;
  // };
  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + (item.data.qty * item.data.discountPrice) / 0.001;
      // if (total > 399000) {
      //   total = total;
      // } else {
      //   total = total + 24500;
      // }
    });
    return total;
  };

  const payNow = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const name = await AsyncStorage.getItem('NAME');
    const mobile = await AsyncStorage.getItem('MOBILE');

    if (setSelectedAddress !== null) {
      navigation.navigate('OrderStatus', {
        status: 'success',
        cartList: cartList,
        total: getTotal(),
        address: selectedAddress,
        userId: userId,
        userName: name,
        userEmail: email,
        userMobile: mobile,
      });
    } else {
      navigation.navigate('OrderStatus', {
        status: 'failed',
      });
    }

    // .catch(error => {
    //   navigation.navigate('OrderStatus', {
    //     status: 'failed',
    //   });
    // });
  };

  const [theme, setTheme] = useState('LIGHT');
  useEffect(() => {
    // const colorTheme = Appearance.getColorScheme();
    const listener = Appearance.addChangeListener(colorThemee => {
      if (colorThemee.colorScheme === 'dark') {
        setTheme('DARK');
      } else {
        setTheme('LIGHT');
      }
    });
    return () => {
      listener;
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'LIGHT' ? '#fff' : '#000'},
      ]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{height: 900}}
        data={cartList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemView}>
              <Image
                source={{uri: item.data.imageUrl}}
                style={styles.itemImage}
              />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.nameText}>XS</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {item.data.discountPrice}
                  </Text>
                </View>
                <View>
                  <Text style={styles.discountText}>{item.data.price}</Text>
                </View>
              </View>
              <Text style={styles.nameText}>{'x ' + item.data.qty}</Text>
            </View>
          );
        }}
      />

      <View style={styles.totalViewd}>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={[
              styles.nameText,
              {
                marginBottom: -10,
                color: theme === 'LIGHT' ? '#43484d' : '#e1e8ee',
              },
            ]}>
            Tổng tiền hàng
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 130,
            }}>
            <Text
              style={[
                styles.nameText,
                {
                  marginBottom: -10,
                  color: theme === 'LIGHT' ? '#43484d' : '#e1e8ee',
                  fontSize: 12,
                  textDecorationLine: 'underline',
                },
              ]}>
              đ
            </Text>
            <Text
              style={[
                styles.nameText,
                {
                  fontSize: 15,
                  marginBottom: -10,
                  color: theme === 'LIGHT' ? '#43484d' : '#e1e8ee',
                },
              ]}>
              {getTotal()}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <Text
              style={[
                styles.nameText,
                {
                  marginBottom: -10,
                  color: theme === 'LIGHT' ? '#43484d' : '#e1e8ee',
                },
              ]}>
              Phí vận chuyển
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 130,
            }}>
            <Text
              style={[
                styles.nameText,
                {
                  marginBottom: -10,
                  color: theme === 'LIGHT' ? '#43484d' : '#e1e8ee',
                  fontSize: 12,
                  textDecorationLine: 'underline',
                },
              ]}>
              đ
            </Text>
            <Text
              style={[
                styles.nameText,
                {
                  fontSize: 15,
                  marginBottom: -10,
                  color: theme === 'LIGHT' ? '#43484d' : '#e1e8ee',
                },
              ]}>
              {0}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text
            style={[
              styles.nameText,
              {
                marginBottom: -10,
                color: theme === 'LIGHT' ? '#43484d' : '#fff',
              },
            ]}>
            Tổng thanh toán
          </Text>
          <View style={{flexDirection: 'row', marginLeft: 65}}>
            <Text
              style={[
                styles.nameText,
                {
                  fontWeight: 'bold',
                  marginBottom: -10,
                  color: colors.buttonssmall,
                  fontSize: 15,
                  textDecorationLine: 'underline',
                },
              ]}>
              đ
            </Text>
            <Text
              style={[
                styles.nameText,
                {
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: -10,
                  color: colors.buttonssmall,
                },
              ]}>
              {getTotal()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.totalView}>
        <Text
          style={{fontSize: 15, color: theme === 'LIGHT' ? '#000' : '#fff'}}>
          Địa chỉ nhận hàng
        </Text>
        <Text
          style={[
            styles.editAddress,
            {color: theme === 'LIGHT' ? '#4080ee' : '#fff'},
          ]}
          onPress={() => {
            navigation.navigate('Address');
          }}>
          Thay đổi
        </Text>
      </View>

      <Text
        style={{
          marginLeft: 5,
          marginRight: 20,
          width: '100%',
          color: theme === 'LIGHT' ? '#000' : '#fff',
          fontSize: 15,
        }}>
        {selectedAddress}
      </Text>

      <View style={{bottom: -10}}>
        <View style={styles.couponSection}>
          <TextInput style={styles.placeholder} placeholder="Nhập Voucher" />
          <Text style={styles.title2}>APPLY</Text>
        </View>

        <TouchableOpacity
          disabled={selectedAddress == 'Chưa có địa chỉ' ? true : false}
          style={[
            styles.checkoutBtn,
            {
              backgroundColor:
                selectedAddress == 'Chưa có địa chỉ' ? '#DADADA' : '#000000',
            },
          ]}
          onPress={() => {
            if (selectedAddress !== 'Chưa có địa chỉ') {
              payNow();
              //navigation.navigate('OrderStatus', {status: 'failed'});
            }
            //
          }}>
          <Text
            style={{
              color: colors.headerText,
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Đặt hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemView: {
    flexDirection: 'row',
    width: '95%',
    height: 130,
    alignSelf: 'center',
    backgroundColor: colors.headerText,
    elevation: 4,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '40%',
    margin: 10,
    // backgroundColor: '#000',
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    color: colors.grey1,
    // marginBottom: 20,
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 17,
    color: colors.buttonssmall,
    //fontWeight: '700',//backgroundColor: colors.grey0,
  },
  discountText: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },

  totalView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    height: 50,
    borderTopWidth: 0.3,
    paddingRight: 20,
    //marginTop: 20,
    alignItems: 'center',
    borderTopColor: '#8e8e8e',
  },
  totalViewd: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    height: 100,
    borderTopWidth: 0.3,
    paddingRight: 20,
    //marginTop: 20,
    //alignItems: 'center',
    borderTopColor: '#8e8e8e',
    justifyContent: 'center',
  },
  editAddress: {
    color: '#4080ee',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  checkoutBtn: {
    backgroundColor: colors.buttonssmall,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 65,
    borderTopLeftRadius: 40,
  },
  selectedBtn: {
    checkoutBtn: {
      backgroundColor: colors.buttonssmall,
      position: 'absolute',
      bottom: 0,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: 45,
      borderTopLeftRadius: 40,
    },
  },
  couponSection: {
    width: '55%',
    height: 50,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.15)',
    borderStyle: 'solid',
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 29,
    flexDirection: 'row',
  },
  placeholder: {
    opacity: 0.6,
    color: '#701010',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 32,
    flex: 1,
  },
  title2: {
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.grey2,
  },
});
