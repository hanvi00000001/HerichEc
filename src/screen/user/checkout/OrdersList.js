import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../../global/styles';
import {Button, Icon} from '@rneui/themed';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';

export default function OrdersList() {
  const route = useRoute();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.note}>
          <Text style={styles.notetext}>
            Đơn hàng sẽ được giao đến bạn trong vòng 7 ngày, vui lòng kiểm tra
            trạng thái đơn hàng qua Email. Hãy chắc chắn các thông tin hoàn toàn
            trùng khớp khi nhận hàng tránh lừa đảo.
          </Text>
        </View>
        <View
          style={{
            marginBottom: 10,
            marginTop: 10,
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
              style={{color: colors.grey0, fontWeight: 'bold', fontSize: 16}}>
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
            Nếu sản phẩm nhận được không đúng với mô tả, thiếu hàng hoặc bị hư
            hỏng, vui lòng gửi yêu cầu đến cskh@herich.gmail.com hoặc liên hệ
            1800 để được hỗ trợ Trả hàng/Hoàn tiền trong vòng 7 ngày nhận được
            đơn hàng.
          </Text>
        </View>
        <View style={styles.addressView}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Icon
              type="material"
              name="place"
              iconStyle={{color: colors.grey3}}
              size={24}
            />
            <Text
              style={{fontWeight: 'bold', color: colors.grey0, fontSize: 16}}>
              Địa chỉ nhận hàng
            </Text>
          </View>
          <Text style={styles.addressText}>dfg dfg dfg</Text>
        </View>

        <View style={{backgroundColor: colors.cardbackground}}>
          <View style={{borderWidth: 0.2}}>
            <View style={{margin: 10, flexDirection: 'row'}}>
              <Image
                style={styles.itemImage}
                // source={{uri: route.params.data.imageUrl}}
              />
              <View>
                <Text style={styles.nameText}>
                  {/* {route.params.data.name}  */}
                  name
                </Text>
                <Text style={styles.qtyText}>
                  {/* {'x' + route.params.data.qty} */}qty
                </Text>
                <Text style={styles.nameText}>
                  prc
                  {/* {route.params.data.discountPrice} */}
                </Text>
              </View>
            </View>
          </View>
          <View style={{}}>
            <View style={{margin: 10, marginLeft: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.grey0,
                    fontWeight: 'bold',
                  }}>
                  Thành tiền
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.buttonssmall,
                    fontWeight: 'bold',
                  }}>
                  ₫355000
                </Text>
              </View>

              <Text style={{fontSize: 13, color: colors.grey1}}>
                Vui lòng thanh toán khi nhận hàng.
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: colors.grey3,
          }}>
          <Text style={{color: colors.grey2, fontSize: 25}}>Đã nhận</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  note: {
    backgroundColor: '#26aa99',
    marginBottom: 10,
  },
  notetext: {
    color: colors.headerText,
    margin: 10,
  },
  addressView: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: colors.cardbackground,
  },
  addressText: {
    marginBottom: 10,
    marginTop: -5,
    margin: 30,
    color: colors.grey1,
    fontSize: 15,
    textAlign: 'justify',
  },
  itemImage: {
    width: 70,
    height: 100,
    marginLeft: 15,
    borderWidth: 0.5,
    borderColor: colors.grey3,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    marginTop: 5,
  },
  qtyText: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
    marginLeft: 15,
  },
});
