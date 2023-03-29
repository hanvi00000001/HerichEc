import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {colors} from '../../../global/styles';
import {Icon, Button} from '@rneui/themed';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../common/Header';
//import auth from '@react-native-firebase/auth';

import {signOutAction} from '../../actions';

let userId = '';
export default function Profile() {
  const route = useRoute();
  // const {user, logout} = useContext(AuthContext);
  const navigation = useNavigation([]);
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const isFocused = useIsFocused();
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    let temp = [];
    const userId = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(documentSnapshot => {
        console.log(' user data: ', documentSnapshot.exists);
        setUsers(documentSnapshot.data());
        if (documentSnapshot.exists) {
          console.log('user data:', documentSnapshot.data());
          setUsersData(documentSnapshot.data());
        }
      });
    // Stop listening for updates when no longer required
    // return () => subscriber();
  };

  const logOut = async () => {
    try {
      await auth().signOut();
      // clear all state and navigate to the login screen
      setUsers(null); // clear user state
      navigation.reset({
        index: 0,
        routes: [{name: 'SelectLogin'}],
      }); // navigate to the login screen
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [isFocused]);
  const getCartItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setCartCount(user._data.cart.length);
  };
  useEffect(() => {
    getCountItems();
  }, [isFocused]);
  const getCountItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setWishCount(user._data.wish.length);
  };

  const logout = async () => {};

  //
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                width: '85%',
              }}>
              {/* <Image
                source={{uri: usersData.profilePic}}
                style={styles.userImg}
              /> */}
              {/* {imageData !== null ? (
                <Image
                  source={{uri: usersData.profilePic}}
                  style={styles.userImg}
                />
              ) : (
                <Image
                  style={styles.userImg}
                  source={require('../../../images/image.png')}
                  //  source={{uri: item.data.imageUrl}}
                />
              )} */}

              <View style={{borderRadius: 60, borderWidth: 0.8}}>
                {imageData == null ? (
                  <Image
                    source={{uri: usersData.profilePic}}
                    style={styles.userImg}
                  />
                ) : (
                  <Image
                    style={styles.userImg}
                    source={require('../../../images/image.png')}
                    //  source={{uri: item.data.imageUrl}}
                  />
                )}
              </View>

              <Text style={styles.userName}>{usersData.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() =>
                navigation.navigate('EditProfile', {
                  data: usersData.users,
                  userId: usersData.userId,
                  name: usersData.name,
                  email: usersData.email,
                  mobile: usersData.mobile,
                  profilePic: usersData.profilePic,
                })
              }>
              <Image
                source={require('../../../images/user-edit.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: colors.grey0,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Icon type="material" name="phone" color={colors.grey1} />
              <Text style={styles.emailText}>{usersData.mobile}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 0}}>
              <Icon type="material" name="email" color={colors.grey1} />
              <Text style={styles.emailText}>{usersData.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {cartCount ? cartCount : '0'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                type="material"
                name="add-shopping-cart"
                iconStyle={{color: colors.buttonssmall}}
              />
              <Text style={styles.userInfoSubTitle}>Giỏ hàng</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Wish');
            }}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>
                {wishCount ? wishCount : '0'}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="material"
                  name="favorite-border"
                  iconStyle={{color: colors.buttonssmall}}
                />
                <Text style={styles.userInfoSubTitle}>Đã thích</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={styles.infor}
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Icon
              type="material"
              name="settings"
              size={25}
              iconStyle={styles.inforIcon}
            />
            <Text style={styles.sub}>Cài đặt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infor}
            onPress={() => {
              navigation.navigate('Guarantee');
            }}>
            <Icon
              type="material"
              name="policy"
              size={25}
              iconStyle={styles.inforIcon}
            />
            <Text style={styles.sub}>Chính sách bảo hành</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infor}
            onPress={() => {
              navigation.navigate('BaoMat');
            }}>
            <Icon
              type="material"
              name="security"
              size={25}
              iconStyle={styles.inforIcon}
            />
            <Text style={styles.sub}>Chính sách bảo mật</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infor}
            onPress={() => {
              navigation.navigate('VanChuyen');
            }}>
            <Icon
              type="material"
              name="local-shipping"
              size={25}
              iconStyle={styles.inforIcon}
            />
            <Text style={styles.sub}>Vận chuyển</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infor}
            onPress={() => {
              //navigation.navigate('');
            }}>
            <Icon
              type="material"
              name="contact-support"
              size={25}
              iconStyle={styles.inforIcon}
            />
            <Text style={styles.sub}>Liên hệ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infor}
            onPress={() => {
              navigation.navigate('Herich');
            }}>
            <Icon
              type="material"
              name="store"
              size={25}
              iconStyle={styles.inforIcon}
            />
            <Text style={styles.sub}>Giới thiệu về Herich</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{marginBottom: 200}}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 48,

              flexDirection: 'row',
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              signOut();
            }}>
            <Icon
              type="material"
              name="logout"
              size={25}
              iconStyle={{marginRight: 5, color: colors.grey0}}
            />
            <Text style={styles.sub}>Đăng xuất</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{marginBottom: 200}}>
          <Button
            radius={'sm'}
            buttonStyle={{backgroundColor: colors.grey0}}
            containerStyle={{
              width: '100%',
              marginVertical: 10,
            }}
            titleStyle={{color: 'white', marginHorizontal: 10}}
            //onPress={() => navigation.navigate('SelectLogin')}
            onPress={() => logOut()}>
            <Icon name="logout" color="white" />
            Đăng xuất
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 0.8,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.grey0,
    top: 30,
    left: 20,
  },
  emailText: {
    fontSize: 16,
    color: colors.grey2,
    marginLeft: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '20%',
  },
  sub: {
    fontSize: 16,
    color: colors.grey0,
  },
  infor: {
    width: '100%',
    height: 30,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  userBtn: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    left: 10,
  },

  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 30,
    borderBottomWidth: 0.5,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
  },
  userInfoSubTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inforIcon: {marginRight: 5, color: colors.grey0},
});
