import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../global/styles';
import Header from '../screen/common/Header';
import {FlatList} from 'react-native-gesture-handler';
export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    firestore()
      .collection('orders')
      .get()
      .then(querySnapshot => {
        console.log('Total orders: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            orderId: documentSnapshot.id,
            data: documentSnapshot.data().data,
          });
        });
        console.log(JSON.stringify(tempData));
        setOrders(tempData);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tất cả đơn hàng</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={({item, index}) => index}
        renderItem={({item, index}) => {
          console.log('item' + item);
          return (
            <View style={styles.orderItem}>
              <FlatList
                data={item.data.items}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.itemView}>
                      <Image
                        source={{uri: item.data.imageUrl}}
                        style={styles.itemImage}
                      />
                      <View>
                        <Text style={styles.nameText}>{item.data.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.sizeText}>size</Text>

                          <Text style={styles.priceText}>
                            {item.data.discountPrice + ' x' + item.data.qty}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: colors.headerText,
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.grey0,
  },
  orderItem: {
    width: '90%',
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 5,
  },
  itemImage: {
    width: 50,
    height: 90,
    borderRadius: 10,
  },
  itemView: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    color: colors.grey0,
    marginLeft: 20,
    marginTop: 5,
  },
  priceText: {
    fontSize: 14,
    color: colors.grey2,
    marginLeft: 10,
    marginTop: 5,
  },
  sizeText: {
    fontSize: 14,
    color: colors.grey1,
    marginLeft: 20,
    marginTop: 5,
  },
});
