import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../../../global/styles';

export default function Newsp() {
  const route = useRoute();
  const [title, setTitle] = useState(route.params.title);
  const [titlebot, setTitlebot] = useState(route.params.titlebot);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 18,
            color: colors.grey0,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          {route.params.title}
        </Text>
        <View style={{margin: 15}}>
          <Text
            style={{fontSize: 15, color: colors.grey1, textAlign: 'justify'}}>
            {route.params.titlebot}
          </Text>
        </View>

        <View style={{margin: 15}}>
          <Text style={{fontWeight: 'bold', color: colors.grey0}}>
            {route.params.ap}
          </Text>
          <View style={{margin: 15}}>
            <Text style={{fontWeight: 'bold', color: colors.grey0}}>
              {route.params.ap0}
            </Text>
            <Image
              source={{uri: route.params.ap0im0}}
              style={{
                width: '100%',
                height: 300,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <Text style={{color: colors.grey1, textAlign: 'justify'}}>
              {route.params.ap0main}
            </Text>
            <Text style={{fontWeight: 'bold', color: colors.grey0}}>
              {route.params.ap1}
            </Text>
            <Text style={{color: colors.grey1, textAlign: 'justify'}}>
              {route.params.ap1main}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
