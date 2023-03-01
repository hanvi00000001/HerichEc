import {colors} from '../../global/styles';
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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let catId = '';
export default function CategoriesCard() {
  const [cat, setCat] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // const subscriber =
    firestore()
      .collection('cat')
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
        setCat(tempData);
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);

  const getItems = async () => {};

  return (
    <View style={styles.container}>
      <View style={{marginTop: 1, marginBottom: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={cat}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity style={styles.touchableOpacity}>
                  <Text style={styles.catname}>{item.data.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Áo Sơ Mi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Quần Dài</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Váy Đầm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Chân Váy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Áo Khoác Blazer & Vest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Set Đồng Bộ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Áo Dài Châu Gia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.catname}>Phụ Kiện</Text>
          </TouchableOpacity>
        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e8ee8e',
  },
  touchableOpacity: {
    height: 40,
    borderRadius: 20,
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 20,
  },
  catname: {
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
  },
});
