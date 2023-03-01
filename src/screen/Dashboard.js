import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Items from '../tabs/Items';
import Transactions from '../tabs/Transactions';
import Add from '../tabs/Add';
import Orders from '../tabs/Orders';
import Notifications from '../tabs/Notification';
import {colors} from '../global/styles';

export default function Dashboard({navigation}) {
  const SignOut = async () => {
    try {
      console.log('USER SUCCESSFULLY SIGNED OUT');
      navigation.navigate('SelectLogin');
    } catch (error) {
      Alert.alert(error.code);
    }
  };
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {/*<View style={styles.header}>
         <TouchableOpacity
          onPress={() => {
            // SignOut();
          }}>
          <Image
            source={require('../images/signout.png')}
            style={{width: 26, height: 26, fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </View> */}
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Transactions />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Orders />
      ) : (
        <Notifications />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../images/items.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 0 ? '#D83E64' : '#8e8e8e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../images/users.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 1 ? '#D83E64' : '#8e8e8e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../images/add.png')}
            style={[
              styles.bottomTabImg,
              {
                width: 45,
                height: 45,
                tintColor: selectedTab == 2 ? '#D83E64' : '#8e8e8e',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../images/orderss.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 3 ? '#D83E64' : '#8e8e8e'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('../images/notification.png')}
            style={[
              styles.bottomTabImg,
              {tintColor: selectedTab == 4 ? '#D83E64' : '#8e8e8e'},
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
    //backgroundColor: '#000',
  },
  bottomView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabImg: {
    width: 26,
    height: 26,
    fontWeight: 'bold',
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
});
