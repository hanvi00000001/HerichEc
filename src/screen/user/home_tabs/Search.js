import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../global/styles';
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../common/Header';
import CategoriesCard from '../../common/CategoriesCard';
let userId = '';

export default function Search() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCartItems();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);
  };

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
        setOldData(tempData);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(response => {
  //       console.log(response);
  //       setData(response);
  //       setOldData(response);
  //     });
  // }, []);
  // const searchFilterFunction = text => {
  //   // Check if searched text is not blank
  //   if (text !== '') {
  //     let tempDatr = items.filter(item => {
  //       return item.data.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
  //     });
  //     setItems(tempDatr);
  //   } else {
  //     setItems(oldData);
  //   }
  // };
  const searchFilterFunction = text => {
    //setData
    // Check if searched text is not blank
    if (text !== '') {
      let tempDatr = items.filter(item => {
        return item.data.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setItems(tempDatr);
    } else {
      setItems(oldData);
    }
  };

  // const [searchText, setSearchText] = useState('');
  // const filterred = () =>
  //   items.filter(each =>
  //     each.name.toLowerCase().includes(searchText.toLowerCase()),
  //   );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        icon={require('../../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          navigation.navigate('Cart');
        }}
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 55,
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '87%',
            height: 55,
            borderRadius: 5,
            borderWidth: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 5,
          }}>
          <Image
            source={require('../../../images/search.png')}
            style={{width: 24, height: 30, marginLeft: 10, opacity: 0.5}}
          />
          <TextInput
            maxLength={40}
            autoCorrect={true}
            placeholder="Tìm kiếm sản phẩm..."
            style={{width: '80%', height: 55, color: '#000'}}
            onChangeText={txt => {
              searchFilterFunction(txt);
              setSearch(txt);
              //setSearchText(txt);
            }}
            ref={searchRef}
            value={search}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction('');
                setSearch('');
              }}>
              <Image
                source={require('../../../images/dele.png')}
                style={{width: 20, height: 20, opacity: 0.5}}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <Image
            source={require('../../../images/filter.png')}
            style={{
              width: 28,
              height: 30,
              marginLeft: 5,
              tintColor: colors.grey0,
            }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{marginBottom: 70}}
        data={items}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductsDetail', {data: item.data});
              }}>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  marginTop: 20,
                  marginBottom: index == data.length - 1 ? 20 : 0,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={{uri: item.data.imageUrl}}
                  style={{
                    // width: 60,
                    // height: '90%',
                    borderRadius: 10,
                    width: 130,
                    height: 150,
                  }}
                />
                <View style={styles.nameView}>
                  <Text style={styles.nameText}>{item.data.name}</Text>
                  <View style={styles.priceView}>
                    <Text style={styles.discountText}>
                      {'₫' + item.data.discountPrice}
                    </Text>
                    <Text style={styles.priceText}>
                      {'₫' + item.data.price}
                    </Text>
                  </View>
                  <Image
                    source={require('../../../images/stars.png')}
                    style={{
                      width: 80,
                      height: 12,
                      marginLeft: 5,
                      tintColor: 'orange',
                      top: 10,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(1);
                const strAscending = items.sort((a, b) =>
                  a.name > b.name ? 1 : -1,
                );
                setData(strAscending);
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                Sắp xếp theo tên
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(2);
                setData(items.sort((a, b) => a.price - b.price));
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                Giá thấp đến cao
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(3);
                setData(items.sort((a, b) => b.price - a.price));
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                Giá cao đến thấp
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(4);
                setData(items.sort((a, b) => a.rating.rate - b.rating.rate));
                setVisible(false);
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                Lọc theo đánh giá
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  nameView: {
    width: '80%',
    margin: 10,
    //backgroundColor: colors.grey2,
  },
  priceView: {
    //flexDirection: 'row',
    //alignItems: 'center',
    //backgroundColor: colors.grey0,
    marginLeft: 5,
  },
  nameText: {
    fontSize: 18,
    color: colors.grey0,
    bottom: 10,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.buttonssmall,
    marginRight: 5,
  },
});
