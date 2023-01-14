import {colors} from '../../../global/styles';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Appearance,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import Header from '../../common/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Wish from './Wishlist';
import Loader from '../../common/Loader';
import CategoriesCard from '../../common/CategoriesCard';
import {useRoute} from '@react-navigation/native';
let userId = '';
export default function Main() {
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

  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [tips, setTips] = useState([]);
  const [beauty, setBeauty] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

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
    // const subscriber =
    firestore()
      .collection('tips')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempDar = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempDar.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setTips(tempDar);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  useEffect(() => {
    // const subscriber =
    firestore()
      .collection('beauty')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempDar = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempDar.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setBeauty(tempDar);
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
    console.log(user._data.cart);
    let tempDart = [];

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

  useEffect(() => {
    getWishItems();
  }, [isFocused]);
  const getWishItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    //setCartCount(user._data.cart.length);
    setWishCount(user._data.wish.length);
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
  const renderFooter = () => {
    if (!isMoreLoading) return true;
    return (
      <ActivityIndicator size="large" color="#d83e64" style={{marginTop: 10}} />
    );
  };
  const onRefresh = () => {
    setTimeout(() => {}, 1000);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'LIGHT' ? '#fff' : '#000'},
      ]}>
      <Header
        //title={'HERICH'}
        icon={require('../../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <ScrollView
        style={{flex: 1, marginBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <View style={{width: '100%', height: 300}}>
          <Swiper autoplay={true}>
            <Image
              source={require('../../../images/banner1.png')}
              style={{
                width: '100%',
                height: 300,
              }}
            />
            <Image
              source={require('../../../images/banner2.png')}
              style={{
                width: '100%',
                height: 300,
              }}
            />

            <Image
              source={require('../../../images/banner3.png')}
              style={{
                width: '100%',
                height: 300,
              }}
            />
          </Swiper>
        </View>

        <View style={{marginTop: 20, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: theme === 'LIGHT' ? '#000' : '#fff',
              fontWeight: 'bold',
            }}>
            {'Sản Phẩm Mới  -  Ưu Đãi Hời'}
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={items}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    //height: 170,
                    width: 250,
                    borderRadius: 20,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    marginTop: 20,
                    backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                  }}
                  onPress={() => {
                    navigation.navigate('ProductsDetail', {
                      // data: items,
                      itmId: item.data.itmId,
                      name: item.data.name,
                      price: item.data.price,
                      discountPrice: item.data.discountPrice,
                      description: item.data.description,
                      imageUrl: item.data.imageUrl,
                      destitle: item.data.destitle,
                      slide1: item.data.slide1,
                      slide2: item.data.slide2,
                      slide3: item.data.slide3,
                      slide4: item.data.slide4,
                    });
                  }}>
                  <View
                    style={{
                      width: '100%',
                      //backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                    }}>
                    <Image
                      source={{uri: item.data.imageUrl}}
                      style={{
                        width: '100%',
                        height: 400, //300
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                    {/* <Text style={{color: '#000'}}>{item.data.itmId}</Text> */}
                    <Text
                      style={{
                        color: theme === 'LIGHT' ? '#000' : '#fff',
                        marginTop: 10,
                        marginLeft: 10,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {item.data.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        //justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                        backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                      }}>
                      <Text style={styles.priceText}>{item.data.price}</Text>
                      <Text
                        style={[
                          styles.discountPrice,
                          {color: theme === 'LIGHT' ? '#000' : '#fff'},
                        ]}>
                        {'₫' + item.data.discountPrice}
                      </Text>

                      <TouchableOpacity
                        style={{
                          borderWidth: 0.5,
                          padding: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          marginLeft: 15,
                          borderColor: theme === 'LIGHT' ? '#000' : '#fff',
                        }}
                        onPress={() => {
                          //navigation.navigate('ProductsDetail');
                          onAddToCart(item, index);
                        }}>
                        <Image
                          source={require('../../../images/cart.png')}
                          style={{
                            width: 24,
                            height: 24,
                            tintColor: colors.buttonssmall,
                          }}
                        />
                      </TouchableOpacity>
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
                        right: 10,
                      }}
                      onPress={() => {
                        onAddToWish(item, index);
                      }}>
                      <Image
                        source={require('../../../images/wish.png')}
                        style={{width: 24, height: 24, borderColor: '#000'}}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={{marginTop: 20, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: theme === 'LIGHT' ? '#000' : '#fff',
              fontWeight: 'bold',
            }}>
            MẸO HAY
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={tips}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    //height: 170,
                    width: 320,
                    borderRadius: 10,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    marginTop: 20,
                    backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                  }}
                  onPress={() => {
                    navigation.navigate('Newsp', {
                      //data: route.params.data
                      title: item.data.title,
                      image: item.data.imageurl,
                      titlebot: item.data.titlebot,
                      ap: item.data.ap,
                      ap0: item.data.ap0,
                      ap0main: item.data.ap0main,
                      ap0im0: item.data.ap0im0,
                      ap1: item.data.ap1,
                      ap1main: item.data.ap1main,
                    });
                  }}>
                  <View
                    style={{
                      width: '100%',
                      //backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                    }}>
                    <Image
                      source={{uri: item.data.imageurl}}
                      style={{
                        width: '100%',
                        height: 200,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        color: colors.grey0,
                        textAlign: 'justify',
                        marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      {item.data.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <View style={{marginTop: 20, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: theme === 'LIGHT' ? '#000' : '#fff',
              fontWeight: 'bold',
            }}>
            ĐẸP CHO NÀNG
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={beauty}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    //height: 170,
                    width: 320,
                    borderRadius: 10,
                    elevation: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    marginTop: 20,
                    backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                  }}
                  onPress={() => {
                    //navigation.navigate('Newsp');
                  }}>
                  <View
                    style={{
                      width: '100%',
                      //backgroundColor: theme === 'LIGHT' ? '#fff' : '#121212',
                    }}>
                    <Image
                      source={{uri: item.data.imageurl}}
                      style={{
                        width: '100%',
                        height: 200,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        color: colors.grey0,
                        textAlign: 'justify',
                        marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                      }}>
                      {item.data.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ScrollView>
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
    width: '90%',
    height: 130,
    alignSelf: 'center',
    backgroundColor: colors.cardbackground,
    elevation: 4,
    marginTop: 10,
    marginBottom: 10,
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
  discountPrice: {
    color: '#000',
    marginTop: 5,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 15,
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: colors.grey2,
    marginRight: 5,
  },
  addToCartBtn: {
    backgroundColor: colors.grey5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
