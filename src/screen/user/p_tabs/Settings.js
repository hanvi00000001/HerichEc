import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../global/styles';

export default function Settings() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.mode}>
          <Text style={{color: colors.grey0, fontSize: 25, fontWeight: 'bold'}}>
            Chủ đề
          </Text>
          <View style={{flexDirection: 'row'}}>
            
            <View>
              <Text style={{color: colors.grey0, fontSize: 18}}>
                Tuỳ chọn mặc định của hệ thống
              </Text>
              <Text style={{color: colors.grey0, fontSize: 15}}>
                Bật giao diện tối khi Trình tiết kiệm pin hoặc giao diện tối
                trên thiết bị đang bật
              </Text>
            </View>
          </View>
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
  mode: {},
});
