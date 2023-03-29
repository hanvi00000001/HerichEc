import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {colors} from '../../../global/styles';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../common/Header';
let userId = '';

export default function Wish() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [wishList, setWishList] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getWishItems();
  }, [isFocused]);
  const getWishItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setWishList(user._data.wish);
  };

  const addItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDartw = [];
    tempDartw = user._data.wish;
    tempDartw.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty + 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      wish: tempDartw,
    });
    getWishItems();
  };

  const deleteItem = async index => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDartw = [];
    tempDartw = user._data.wish;
    tempDartw.splice(index, 1);
    firestore().collection('users').doc(userId).update({
      wish: tempDartw,
    });
    getWishItems();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        icon={require('../../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <FlatList
        numColumns={2}
        style={{marginBottom: 80, marginRight: 5}}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={wishList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                //height: 170,
                width: 200,
                borderRadius: 20,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 0,
                marginRight: 5,
                backgroundColor: '#fff',
                marginBottom: 10,
                marginTop: 5,
              }}
              onPress={() => {
                navigation.navigate('ProductsDetail', {
                  // id: item.data.id,
                  data: item.data,
                  id: item.id,
                });
              }}>
              <View style={{width: '100%'}}>
                <Image
                  source={{uri: item.data.imageUrl}}
                  style={styles.itemImage}
                />
                <Text style={styles.nameText}>{item.data.name}</Text>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: 5,
                    marginLeft: 5,
                  }}>
                  <Text style={styles.priceText}>
                    {item.data.price + ' VNĐ'}
                  </Text>
                  <Text style={styles.discountText}>
                    {item.data.discountPrice}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 40,
                    elevation: 5,
                    height: 40,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 10,
                    left: 30,
                  }}
                  onPress={() => {
                    deleteItem(index);
                  }}>
                  <Image
                    source={require('../../../images/wish_fill.png')}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: 'red',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  itemView: {
    flexDirection: 'row',
    width: '95%',
    height: 130,
    alignSelf: 'center',
    backgroundColor: colors.headerText,
    elevation: 4,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    //backgroundColor: colors.grey0,
  },
  itemImage: {
    width: '100%',
    height: 300, //300
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nameView: {
    width: '40%',
    margin: 10,
    //backgroundColor: colors.grey2,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: colors.grey0,
  },
  nameText: {
    color: '#000',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 15,
    color: colors.buttonssmall,

    //fontWeight: '700',//backgroundColor: colors.grey0,
  },
  discountText: {
    fontSize: 15,
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: colors.grey2,
  },
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: colors.grey5,
  },
  addToCartBtn: {
    width: 40,
    elevation: 5,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  checkoutBtn: {
    //backgroundColor: colors.grey0,
    padding: 5,
    borderRadius: 0,
    borderWidth: 0.2,
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkoutView: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: colors.grey2,
  },
});
