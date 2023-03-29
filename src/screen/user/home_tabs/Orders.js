import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Header from '../../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {colors} from '../../../global/styles';
import {Button, Icon} from '@rneui/themed';
import {ScrollView} from 'react-native';

export default function Orders() {
  const navigation = useNavigation([]);
  const [isShow, setIsShow] = useState(true);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    console.log(JSON.stringify(user._data.orders));
    setOrderList(user._data.orders);
  };
  return (
    <View style={styles.container}>
      <Header title={'Đơn mua'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Button
            buttonStyle={{
              backgroundColor: null,
              alignSelf: 'flex-start',
            }}
            titleStyle={{color: colors.grey0, marginHorizontal: 5}}
            onPress={() => setIsShow(!isShow)}>
            Lưu ý<Icon name="expand-more" color="#000000" />
          </Button>
          {isShow ? (
            <View>
              <View style={styles.note}>
                <Text style={styles.notetext}>
                  Đơn hàng sẽ được giao đến bạn trong vòng 7 ngày, vui lòng kiểm
                  tra trạng thái đơn hàng qua Email. Hãy chắc chắn các thông tin
                  hoàn toàn trùng khớp khi nhận hàng tránh lừa đảo.
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 10,
                  backgroundColor: colors.cardbackground,
                }}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Icon
                    type="material"
                    name="notifications-none"
                    iconStyle={{color: '#1a73e8'}}
                    size={24}
                  />
                  <Text
                    style={{
                      color: colors.grey0,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Hãy nhớ kiểm tra đơn hàng của bạn!
                  </Text>
                </View>

                <Text
                  style={{
                    marginBottom: 10,
                    marginTop: -5,
                    margin: 30,
                    color: colors.grey1,
                    fontSize: 15,
                    textAlign: 'justify',
                  }}>
                  Nếu sản phẩm nhận được không đúng với mô tả, thiếu hàng hoặc
                  bị hư hỏng, vui lòng gửi yêu cầu đến cskh@herich.gmail.com
                  hoặc liên hệ 1800 để được hỗ trợ Trả hàng/Hoàn tiền trong vòng
                  7 ngày nhận được đơn hàng.
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        <View>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrdersList');
            }}>
            <Text style={{color: '#000'}}> </Text>
          </TouchableOpacity> */}

          <FlatList
            data={orderList}
            keyExtractor={({item, index}) => index}
            renderItem={({item, index}) => {
              return (
                <View style={styles.orderItem}>
                  <View style={styles.addressView}>
                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                      <Icon
                        type="material"
                        name="place"
                        iconStyle={{color: colors.grey3}}
                        size={24}
                      />
                      <Text
                        style={{
                          color: colors.grey0,
                          fontSize: 16,
                        }}>
                        Thông tin vận chuyển
                      </Text>
                    </View>
                    <Text style={[styles.addressText, {color: colors.buttons}]}>
                      Đang vận chuyển
                    </Text>
                  </View>
                  <View style={styles.addressView}>
                    <View style={{flexDirection: 'row', marginLeft: 15}}>
                      <Icon
                        type="material"
                        name="place"
                        iconStyle={{color: colors.grey3}}
                        size={24}
                      />
                      <Text
                        style={{
                          color: colors.grey0,
                          fontSize: 16,
                        }}>
                        Địa chỉ nhận hàng
                      </Text>
                    </View>
                    <Text style={styles.addressText}>{item.address}</Text>
                  </View>

                  <FlatList
                    style={styles.fitem}
                    data={item.items}
                    renderItem={({item, index}) => {
                      return (
                        <View style={styles.itemView}>
                          <Image
                            source={{uri: item.data.imageUrl}}
                            style={styles.itemImage}
                          />
                          <View>
                            <Text style={styles.nameText}>
                              {item.data.name}
                            </Text>
                            <Text style={styles.nameText}>
                              {'₫' + item.data.discountPrice}
                            </Text>
                            <Text style={styles.nameText}>
                              {' x' + item.data.qty}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {/* <Text style={{color: colors.grey0}}>
                      Vui lòng thanh toán khi nhận hàng!
                    </Text> */}
                      <Text
                        style={{
                          fontSize: 15,
                          color: colors.grey0,
                          fontWeight: 'bold',
                          marginLeft: 20,
                        }}>
                        Thành tiền
                      </Text>
                      <Text
                        style={{
                          color: colors.grey0,
                          marginRight: 10,
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {item.orderTotal}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.grey2,
                        marginLeft: 20,
                      }}>
                      Vui lòng thanh toán khi nhận hàng!
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  note: {
    backgroundColor: '#26aa99',
  },
  notetext: {
    color: colors.headerText,
    margin: 10,
  },
  fitem: {
    borderWidth: 0.2,
    borderColor: colors.grey4,
  },
  orderItem: {
    width: '100%',
    borderRadius: 5,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    //marginTop: 20,
    marginBottom: 10,
  },
  itemImage: {
    width: 70,
    height: 100,
    borderWidth: 0.5,
    borderColor: colors.grey2,
    marginLeft: 15,
  },
  itemView: {
    margin: 3,
    width: '100%',
    flexDirection: 'row',
  },
  addressView: {
    marginTop: 10,
    backgroundColor: colors.cardbackground,
  },
  addressText: {
    marginBottom: 10,
    marginTop: -5,
    marginLeft: 30,
    color: colors.grey1,
    fontSize: 15,
    textAlign: 'justify',
  },
  nameText: {
    fontSize: 16,
    color: colors.grey0,
    marginLeft: 10,
    marginTop: 5,
  },
});
