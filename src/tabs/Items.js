import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../global/styles';
import {useNavigation, useIsFocused} from '@react-navigation/native';

export default function Items() {
  const isFocused = useIsFocused();
  const navigation = useNavigation([]);
  const [items, setItems] = useState();
  useEffect(() => {
    getItems();
  }, [isFocused]);
  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let temData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          temData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(temData);
      });
  };

  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems();
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemView}>
              <Image
                source={{uri: item.data.imageUrl}}
                style={styles.itemImage}
              />
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.discountText}>
                    {item.data.discountPrice}
                  </Text>
                  <Text style={styles.priceText}>{item.data.price}</Text>
                </View>
                <Text style={styles.categories}>
                  {item.data.categories + '\nid: ' + item.data.itmId}
                </Text>
              </View>

              <View>
                <TouchableOpacity
                  style={{margin: 10}}
                  onPress={() => {
                    navigation.navigate('EditItem', {
                      data: item.data,
                      id: item.id,
                    });
                  }}>
                  <Image
                    source={require('../images/edit.png')}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{margin: 10}}
                  onPress={() => {
                    deleteItem(item.id);
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={[
                      styles.icon,
                      {
                        tintColor: '#000',
                        marginTop: 25,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
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
    marginBottom: 90,
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
  discountText: {
    fontSize: 16,
    color: colors.buttonssmall,
    fontWeight: '700',
  },
  priceText: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: colors.grey2,
  },
  categories: {
    fontSize: 15,
    textDecorationLine: 'underline',
    marginLeft: 5,
    color: colors.grey1,
  },
  icon: {
    width: 26,
    height: 26,
  },
});
