import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../../global/styles';

export default function OrderStatus({navigation}) {
  const route = useRoute();
  useEffect(() => {
    if (route.params.status == 'success') {
      placeOrder();
    }
  }, []);
  const placeOrder = async () => {
    let tempOrders = [];
    let user = await firestore()
      .collection('users')
      .doc(route.params.userId)
      .get();
    tempOrders = user._data.orders;
    tempOrders.push({
      items: route.params.cartList,
      address: route.params.address,
      orderBy: route.params.userName,
      userEmail: route.params.userEmail,
      userMobile: route.params.userMobile,
      userId: route.params.userId,
      orderTotal: route.params.total,
    });
    firestore().collection('users').doc(route.params.userId).update({
      cart: [],
      orders: tempOrders,
    });
    firestore()
      .collection('orders')
      .add({
        data: {
          items: route.params.cartList,
          address: route.params.address,
          orderBy: route.params.userName,
          userEmail: route.params.userEmail,
          userMobile: route.params.userMobile,
          userId: route.params.userId,
          orderTotal: route.params.total,
        },
        orderBy: route.params.userId,
        // userMobile: route.params.userMobile,
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          route.params.status == 'success'
            ? require('../../../images/success.gif')
            : require('../../../images/failed.gif')
        }
        style={styles.icon}
      />
      <Text style={styles.msg}>
        {route.params.status == 'success'
          ? 'Đặt hàng thành công !!'
          : 'Đặt hàng không thành công !!'}
      </Text>

      <TouchableOpacity
        style={styles.backToHome}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={{color: colors.buttonssmall, fontSize: 25}}>
          Trang chủ
        </Text>
      </TouchableOpacity>
      {/* <Image
        source={require('../../../images/85744success.gif')}
        style={styles.icon0}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '40%',
    alignSelf: 'center',
  },
  icon0: {
    width: '70%',

    alignSelf: 'center',
  },
  msg: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: -50,
  },
  backToHome: {
    width: '50%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
