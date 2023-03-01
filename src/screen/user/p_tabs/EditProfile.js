import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../../global/styles';
import {Icon} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../common/Loader';

export default function EditProfile({navigation}) {
  const route = useRoute();
  const [imagePicked, setImagePicked] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [mobile, setMobile] = useState(route.params.mobile);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };

  const uploadprofile = async () => {
    setModalVisible(true);
    const userId = await AsyncStorage.getItem('USERID');
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);

    firestore()
      .collection('users')
      .doc(userId)
      .update({
        name: name,
        mobile: mobile,
        email: email,
        profilePic: url,
      })
      .then(() => {
        setModalVisible(false);
        console.log('User edit!');
        navigation.goBack();
      })
      .catch(() => {
        setModalVisible(false);
        console.log('User not change!');
        navigation.goBack();
      });
  };
  //

  //
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission();
          }}>
          {imageData !== null ? (
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={styles.imageStyle}
            />
          ) : (
            <Image
              style={styles.imageStyle}
              source={require('../../../images/image.png')}
            />
          )}
        </TouchableOpacity>

        <View style={styles.view10}>
          <View>
            <Icon
              name="alternate-email"
              style={styles.inputIcon}
              color={colors.grey2}
              type="material"
            />
          </View>
          <View style={styles.view11}>
            <TextInput
              placeholder="Email"
              style={styles.inputStyle}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>
        <View style={styles.view10}>
          <View>
            <Icon
              name="assignment-ind"
              style={styles.inputIcon}
              color={colors.grey2}
              type="material"
            />
          </View>
          <View style={styles.view11}>
            <TextInput
              placeholder="Tên"
              style={styles.inputStyle}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
        </View>
        <View style={styles.view10}>
          <View>
            <Icon
              name="phone"
              style={styles.inputIcon}
              color={colors.grey2}
              type="material"
            />
          </View>
          <View style={styles.view11}>
            <TextInput
              maxLength={10}
              keyboardType="number-pad"
              placeholder="Số điện thoại"
              style={styles.inputStyle}
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uploadprofile();
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>THAY ĐỔI</Text>
        </TouchableOpacity>
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // inputStyle: {
  //   width: '90%',
  //   height: 50,
  //   borderRadius: 10,
  //   borderWidth: 0.5,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   marginTop: 30,
  //   alignSelf: 'center',
  //   color: colors.grey0,
  // },
  uploadBtn: {
    backgroundColor: colors.buttonssmall,
    width: '80%',
    height: 50,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  imageStyle: {
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 10,
    borderColor: colors.grey0,
    borderWidth: 0.2,
  },
  view10: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    marginLeft: 20,
    marginTop: 20,
    height: 50,
    width: '90%',
    borderBottomColor: colors.buttonssmall,
  },
  view11: {marginLeft: 30, maxWidth: '65%'},
  inputIcon: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },
  inputStyle: {
    fontSize: 16,
    marginLeft: -20,
    marginBottom: -10,
    color: '#000',
  },
});
