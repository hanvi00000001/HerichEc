import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Appearance,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../global/styles';

const {height, width} = Dimensions.get('window');
export default function Header({title, icon, count, onClickIcon}) {
  const [theme, setTheme] = useState('LIGHT');
  useEffect(() => {
    // const colorTheme = Appearance.getColorScheme();
    const listener = Appearance.addChangeListener(colorThemee => {
      if (colorThemee.colorScheme === 'dark') {
        setTheme('DARK');
      } else {
        setTheme('LIGHT');
      }
    });
    return () => {
      listener;
    };
  }, []);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'LIGHT' ? '#fff' : '#000'},
      ]}>
      <Image
        source={require('../../images/logove.png')}
        style={styles.titleLogo}
      />
      <Text
        style={[styles.title, {color: theme === 'LIGHT' ? '#000' : '#fff'}]}>
        {title}
      </Text>

      {icon && (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onClickIcon();
            }}>
            <Image
              source={icon}
              style={[
                styles.icon,
                {tintColor: theme === 'LIGHT' ? '#000' : '#fff'},
              ]}
            />
          </TouchableOpacity>
          <View style={styles.count}>
            <Text style={{color: '#fff'}}>{count ? count : '0'}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
  },
  title: {
    fontSize: 25,
    //fontWeight: 'bold',
    top: 5,
  },
  titleLogo: {
    width: 120,
    height: 70,
    top: 5,
    marginRight: -150,
  },
  icon: {
    width: 40,
    height: 40,
  },
  count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
