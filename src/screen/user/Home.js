import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
import {colors} from '../../global/styles';
import Main from './home_tabs/Main';
import Search from './home_tabs/Search';
import Wishlist from './home_tabs/Wishlist';
import Orders from './home_tabs/Orders';
import Profile from './home_tabs/Profile';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
let userId = '';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCountItems();
  }, [isFocused]);
  const getCountItems = async () => {
    userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    setWishCount(user._data.wish.length);
  };

  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <Wishlist />
      ) : selectedTab == 3 ? (
        <Orders />
      ) : (
        <Profile />
      )}
      <View style={styles.bottomTabsView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={
              selectedTab == 0
                ? require('../../images/home_fill.png')
                : require('../../images/home.png')
            }
            style={[
              styles.bottomIcon,
              {tintColor: selectedTab == 0 ? '#D83E64' : '#86939e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={
              selectedTab == 1
                ? require('../../images/search_fill.png')
                : require('../../images/search.png')
            }
            style={[
              styles.bottomIcon,
              {tintColor: selectedTab == 1 ? '#D83E64' : '#86939e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity //
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={
              selectedTab == 2
                ? require('../../images/wish_fill.png')
                : require('../../images/wish.png')
            }
            style={[
              styles.bottomIcon,
              {tintColor: selectedTab == 2 ? '#D83E64' : '#86939e'},
            ]}
          />

          <View style={styles.count}>
            <Text style={styles.textcount}>{wishCount ? wishCount : '0'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={
              selectedTab == 3
                ? require('../../images/order_fill.png')
                : require('../../images/order.png')
            }
            style={[
              styles.bottomIcon,
              {tintColor: selectedTab == 3 ? '#D83E64' : '#86939e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={
              selectedTab == 4
                ? require('../../images/profile_fill.png')
                : require('../../images/profile.png')
            } //selectedTab==4? require('../../images/profile.png'):
            style={[
              styles.bottomIcon,
              {tintColor: selectedTab == 4 ? '#D83E64' : '#86939e'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabsView: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: colors.headerText,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 28,
    height: 28,
  },
  count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 0.2,
    //borderColor: 'red',
  },
  textcount: {color: '#fff', fontWeight: 'bold'},
});
