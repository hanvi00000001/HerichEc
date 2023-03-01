import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Icon, SocialIcon, Button} from '@rneui/themed';

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
  Alert,
} from 'react-native';
import {colors} from '../global/styles';

export default function Transactions() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [showBox, setShowBox] = useState(true);

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);
  useEffect(() => {
    getUsers();
  }, [isFocused]);

  const getUsers = () => {
    firestore()
      .collection('users')
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
        setUsers(tempData);
      });
  };

  const deleteUser = docId => {
    firestore()
      .collection('users')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getUsers();
      });
  };

  const hide = () => {};

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quản lý người dùng</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({item, index}) => {
          return (
            <View style={styles.view}>
              <View style={styles.viewimg}>
                <Text style={styles.textu}>{count}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  height: '100%',
                }}>
                <View style={styles.viewname}>
                  <Text style={styles.textu}>{item.data.name}</Text>
                </View>
                <View style={styles.viewname}>
                  <Text style={styles.textu}>{item.data.email}</Text>
                </View>
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                }}>
                {/* {item.data.hid && (
                  <TouchableOpacity
                    style={{bottom: 10, left: 2}}
                    onPress={() => {}}>
                    <Icon
                      style={styles.visibility}
                      color="#1273eb"
                      type="material"
                      name={isSecureEntry ? 'visibility-off' : 'visibility'}
                      onPress={() => {
                        setIsSecureEntry(prev => !prev);
                      }}
                      // {...isSecureEntry? 'visibility' : 'visibility-off'}
                    />
                  </TouchableOpacity>
                )} */}

                {/* <View style={styles.newContainer}>
                 <Text style={styles.newText}>NEW</Text>
                </View> */}
                <TouchableOpacity
                  style={{top: 10, left: 5}}
                  onPress={() => {
                    //deleteUser(item.id);
                    Alert.alert(
                      'Xoá tài khoản?',
                      'Bạn có chắc chắn muốn xoá tài koản này?',
                      [
                        // The "Yes" button
                        {
                          text: 'Xoá',
                          onPress: () => {
                            // setShowBox(false);
                            deleteUser(item.id);
                          },
                        },
                        // The "No" button
                        // Does nothing but dismiss the dialog when tapped
                        {
                          text: 'Trở lại',
                        },
                      ],
                    );
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={{width: 20, height: 20, tintColor: 'red'}}
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
    marginBottom: 60,
    //backgroundColor: '#fff',
  },
  header: {
    height: 50,
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
  view: {
    width: '100%',
    height: 70,
    borderWidth: 0.5,
    borderColor: colors.grey4,
    marginBottom: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  textu: {
    color: colors.grey0,
    fontSize: 13,
    fontWeight: 'bold',
  },
  viewimg: {
    alignSelf: 'center',
    width: 40,
    alignItems: 'center',
  },
  viewname: {
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  visibility: {
    width: 50,
    height: 20,
    right: 10,
  },
  newContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: '#D83E64',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  newText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
