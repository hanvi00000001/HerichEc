import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Appearance,
} from 'react-native';
import {colors} from '../../global/styles';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId = '';

export default function Cart({navigation}) {
  const [theme, setTheme] = useState('LIGHT');
  useEffect(() => {
    //const colorTheme = Appearance.getColorScheme();
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
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    getCartItems();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart);
  };

  const addItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty + 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const removeItem = async item => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.map(itm => {
      if (itm.id == item.id) {
        itm.data.qty = itm.data.qty - 1;
      }
    });
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const deleteItem = async index => {
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.splice(index, 1);
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    getCartItems();
  };
  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + (item.data.qty * item.data.discountPrice) / 0.001;
    });
    return total;
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'LIGHT' ? '#fff' : '#000'},
      ]}>
      <FlatList
        style={{marginBottom: 45}}
        //horizontal={false}
        // showsHorizontalScrollIndicator={true}
        data={cartList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductsDetail', {
                    data: item.data,
                    id: item.id,
                  });
                }}>
                <Image
                  source={{uri: item.data.imageUrl}}
                  style={styles.itemImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Xoá?', 'Xoá sản phẩm này khỏi giỏ hàng?', [
                    // The "Yes" button
                    {
                      text: 'Xoá',
                      onPress: () => {
                        //deleteItem(item.id);
                        deleteItem(index);
                      },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                      text: 'Trở lại',
                    },
                  ]);
                }}
                style={{
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  borderRadius: 20,
                  //borderWidth: 0.5,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../images/remove.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>XS</Text>
                <View style={styles.priceView}>
                  <Text style={styles.discountText}>
                    {item.data.discountPrice}
                  </Text>
                </View>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>{item.data.price}</Text>
                </View>
              </View>
              <View style={styles.addRemoveView}>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      //marginRight: 10,
                    },
                  ]}
                  onPress={() => {
                    if (item.data.qty > 1) {
                      removeItem(item);
                    } else {
                      deleteItem(index);
                    }
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      color: colors.grey0,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.grey0,
                    borderRadius: 0,
                    borderWidth: 0.2,
                    width: 30,
                    height: 30,
                    textAlign: 'center',
                    textAlignVertical: 'bottom',
                  }}>
                  {item.data.qty}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.addToCartBtn,
                    {
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      //marginLeft: 10,
                    },
                  ]}
                  onPress={() => {
                    addItem(item);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      color: colors.grey0,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {cartList.length > 0 && (
        <View style={styles.checkoutView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.grey3}}>{'Tổng tiền hàng: '}</Text>
            <Text
              style={{
                color: colors.buttonssmall,
                fontWeight: 'bold',
                fontSize: 15,
                bottom: 3,
                textDecorationLine: 'underline',
              }}>
              đ
            </Text>
            <Text
              style={{
                color: colors.buttonssmall,
                fontWeight: 'bold',
                fontSize: 17,
                bottom: 3,
              }}>
              {getTotal()}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              {'Mua hàng (' + cartList.length + ')'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    width: 100,
    height: 120,
    borderRadius: 10,
    margin: 5,
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
    fontSize: 17,
    color: colors.grey0,
    // marginBottom: 20,
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 15,
    textDecorationLine: 'line-through',

    //fontWeight: '700',//backgroundColor: colors.grey0,
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.buttonssmall,
  },
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: colors.grey5,
  },
  addToCartBtn: {
    //backgroundColor: colors.grey5,
    //padding: 5,
    borderRadius: 0,
    borderWidth: 0.2,
    width: '90%',
    height: 30,
  },
  checkoutBtn: {
    backgroundColor: colors.grey0,
    padding: 5,
    borderBottomEndRadius: 40,
    borderBottomWidth: 5,
    marginRight: -100,
    width: '50%',
    height: 60,
    justifyContent: 'center',
    //alignItems: 'center',
  },

  checkoutView: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -5,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: colors.grey2,
  },
});
