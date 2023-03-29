import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../global/styles';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {useRoute} from '@react-navigation/native';
import Header from '../../common/Header';
import Swiper from 'react-native-swiper';
let itmId = '';
let userId = '';
let id = '';

export default function ProductsDetail() {
  const [cartCount, setCartCount] = useState(0);
  const isFocused = useIsFocused();
  const navigation = useNavigation([]);
  const [select, setSelect] = useState(0);

  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  //const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const subscriber =
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);
  };

  const onAddToCart = async (item, index) => {
    const user = await firestore().collection('users').doc(userId).get();
    const items = await firestore()
      .collection('items')
      .doc(route.params.id)
      .get();
    console.log(user._data.cart);
    let tempDart = [];
    //id = route.params.id;

    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      let existing = false;

      tempDart.map(itm => {
        if (itm.id == item.id) {
          existing = true;
          itm.data.qty = itm.data.qty + 1;
        }
      });
      if (existing == false) {
        tempDart.push(item);
      }
      firestore().collection('users').doc(userId).update({
        cart: tempDart,
      });
    } else {
      tempDart.push(item);
    }
    console.log(tempDart);
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
  };
  const onAddToWish = async (item, index) => {
    const user = await firestore().collection('users').doc(userId).get();
    console.log(user._data.wish);
    let tempDartw = [];
    tempDartw = user._data.wish;
    if (tempDartw.length > 0) {
      let existing = false;
      tempDartw.map(itm => {
        if (itm.id == item.id) {
          existing = true;
          itm.data.qty = 1;
        }
      });
      if (existing == false) {
        tempDartw.push(item);
      }
      firestore().collection('users').doc(userId).update({
        wish: tempDartw,
      });
    } else {
      tempDartw.push(item);
    }

    console.log(tempDartw);
    firestore().collection('users').doc(userId).update({
      wish: tempDartw,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{marginBottom: 40}}>
          <View
            style={{
              //height: 170,
              width: '100%',
              elevation: 5,
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Swiper style={{height: 550}}>
              <Image
                style={styles.itemImage}
                source={{uri: route.params.data.imageUrl}}
              />
              <Image
                source={{uri: route.params.data.slide1}}
                style={styles.itemImage}
              />
              <Image
                source={{uri: route.params.data.slide2}}
                style={styles.itemImage}
              />
              <Image
                source={{uri: route.params.data.slide3}}
                style={styles.itemImage}
              />
              <Image
                source={{uri: route.params.data.slide4}}
                style={styles.itemImage}
              />
            </Swiper>
            {/* <Image
              style={styles.itemImage}
              source={{uri: route.params.imageUrl}}
            /> */}
          </View>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 25,
              color: colors.grey0,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            {route.params.data.name}
            {/* {route.params.id} */}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginLeft: 15,
                color: '#127daf',
                marginBottom: 10,
              }}>
              Còn hàng
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 22,
                color: colors.buttonssmall,
                fontWeight: 'bold',
              }}>
              {'₫' + route.params.data.discountPrice}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                fontSize: 13,
                color: colors.grey3,
                textDecorationLine: 'line-through',
                textAlignVertical: 'center',
              }}>
              {'₫' + route.params.data.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              right: 30,
              justifyContent: 'space-around',
            }}>
            <Text style={{color: colors.grey2}}>Kích thước</Text>
            <Text
              style={styles.sizechart}
              onPress={() => {
                navigation.navigate('Sizechart');
              }}>
              Hướng dẫn chọn size
            </Text>
          </View>

          <View
            style={{
              marginLeft: -15,
              marginRight: 15,
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            {/* <Button title="XS" style={styles.tousize} color="#fff" /> */}

            <TouchableOpacity style={[styles.tousize, {}]}>
              <Text style={styles.sizetext}>XS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tousize}>
              <Text style={styles.sizetext}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tousize}>
              <Text style={styles.sizetext}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tousize}>
              <Text style={styles.sizetext}>L</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tousize}>
              <Text style={styles.sizetext}>XL</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginLeft: 15,
              marginTop: 60,
              color: colors.grey0,
              fontWeight: 'bold',
            }}>
            Chi tiết sản phẩm
          </Text>
          <View style={{marginTop: 20, marginLeft: 15, marginRight: 15}}>
            <Text
              style={{
                color: colors.grey0,
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {route.params.data.destitle}
            </Text>
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                textAlign: 'justify',
                color: colors.grey0,
                marginBottom: 20,
              }}>
              {route.params.data.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: colors.grey0,
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        onPress={() => {
          onAddToCart();
        }}>
        <Text
          style={{
            color: colors.headerText,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Thêm vào giỏ hàng
        </Text>
        <Image
          source={require('../../../images/cart.png')}
          style={{
            marginLeft: 10,
            width: 30,
            height: 30,
            tintColor: colors.buttonssmall,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', //f9f5ee
  },
  v2: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    // shadowOffset: {x: 1, y: 1},
    // shadowColor: '#000',
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    //justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  name: {
    margin: 10,
    fontSize: 18,
    color: colors.grey0,
    fontWeight: 'bold',
  },

  itemView: {
    backgroundColor: colors.grey3,
    flexDirection: 'row',
    width: '90%',
    height: 130,
    alignSelf: 'center',
    backgroundColor: colors.headerText,
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 550, //600
    //borderRadius: 10,
  },
  nameView: {
    width: '55%',
    marginTop: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.grey0,
  },
  descText: {
    fontSize: 14,
    color: colors.grey1,
  },
  priceText: {
    fontSize: 16,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 15,
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: colors.grey2,
  },
  addToCartBtn: {
    backgroundColor: colors.grey5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizechart: {
    color: '#127daf',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    //marginLeft: 15,
    marginBottom: 10,
  },
  tousize: {
    justifyContent: 'center',
    //borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 0.6,
    borderColor: colors.grey4,
    alignItems: 'center',
  },
  sizetext: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.grey0,
  },
  siv: {
    flexDirection: 'row',
    //backgroundColor: colors.grey0,
    justifyContent: 'space-between',
    paddingLeft: 20,

    paddingRight: 20,
    marginTop: 20,
    alignItems: 'center',
  },
});
