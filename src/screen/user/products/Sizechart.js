import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {colors} from '../../../global/styles';
import {Header} from '@react-navigation/stack';

export default function Sizechart() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 29}}>
        <View>
          <Image
            source={require('../../../images/sizesomi.png')}
            style={styles.siza}
          />
          <Image
            source={require('../../../images/sizevaydam.png')}
            style={styles.siza}
          />
          <Image
            source={require('../../../images/sizeaothun.png')}
            style={styles.siza}
          />
          <Image
            source={require('../../../images/sizechanvay.png')}
            style={styles.siza}
          />
          <Image
            source={require('../../../images/sizequandai.png')}
            style={styles.siza}
          />
          <Image
            source={require('../../../images/sizevestda.png')}
            style={[styles.siza, {marginBottom: -20}]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#f9f5ee',
  },
  siza: {
    width: '100%',
    height: 600,
    marginBottom: 30,
  },
});
