import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {colors} from '../global/styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {SelectList} from 'react-native-dropdown-select-list';
import {useRoute} from '@react-navigation/native';
import uuid from 'react-native-uuid';

export default function Add() {
  const [imageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [discountPrice, setDiscountPrice] = useState('0');
  const [description, setDescription] = useState('');
  const [destitle, setDestitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [slide0, setSlide0] = useState('');
  const [categories, setCategories] = useState(''); //2
  const [catId, setCatId] = useState('');
  const [itmId, setItmId] = useState('');

  // const categories = [
  //   {key: '1', value: 'Sơ mi'},
  //   {key: '2', value: 'Đầm'},
  //   {key: '3', value: 'Quần dài'},
  //   {key: '4', value: 'Set đồng bộ'},
  //   {key: '5', value: 'Khoác ngoài'},
  //   {key: '6', value: 'Phụ kiện'},
  //  {key: '7', value: 'chân váy'},
  //{key: '8', value: 'áo dài'},
  // ];
  const [selected, setSelected] = React.useState('');
  const route = useRoute();

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

  const uploadImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    uploadItem(url);
  };
  const uploadItem = url => {
    firestore()
      .collection('items')
      .add({
        name: name,
        price: price,
        discountPrice: discountPrice,
        description: description,
        destitle: destitle,
        imageUrl: url + '',
        categories: categories,
        catId: catId, //1
        qty: 1,
        itmId: itmId,
      })
      // .doc(itemId)
      // .set({itemId: itemId})
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Thêm sản phẩm</Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null}

        {/* <SelectList
        //onSelect=
          data={categories}
          value={category}
          setSelected={setSelected}
          dropdownTextStyles={{color: colors.grey0}}
          placeholder="Phân Loại"
          dropdownStyles={{width: '90%', alignSelf: 'center'}}
          boxStyles={{
            paddingHorizontal: 20,
            marginTop: 60,
            marginBottom: 0,
            width: '90%',
            height: 50,
            alignSelf: 'center',
          }}
        /> */}

        <TextInput
          placeholder="Id"
          style={styles.inputStyle}
          value={itmId}
          onChangeText={text => setItmId(text)}
        />
        <TextInput
          placeholder="Cat"
          style={styles.inputStyle}
          value={categories}
          onChangeText={text => setCategories(text)}
        />
        <TextInput
          placeholder="Cat Id"
          style={styles.inputStyle}
          value={catId}
          onChangeText={text => setCatId(text)}
        />

        <TextInput
          placeholder="Tên sản phẩm"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Giá sản phẩm"
          style={styles.inputStyle}
          value={price}
          onChangeText={text => setPrice(text)}
        />

        <TextInput
          placeholder="Giảm giá"
          style={styles.inputStyle}
          value={discountPrice}
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Tiêu đề mô tả"
          style={styles.inputStyle}
          value={destitle}
          onChangeText={text => setDestitle(text)}
        />
        <TextInput
          placeholder="Mô tả"
          style={styles.inputStyle}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          placeholder="URL"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
        />
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            color: colors.grey0,
            fontWeight: 'bold',
          }}>
          OR
        </Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text style={{color: colors.grey0}}>Chọn ảnh từ..</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => {
          uploadImage();
        }}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
          Upload sản phẩm
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.headerText,
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
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    //backgroundColor: colors.buttonssmall,
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  imageStyle: {
    width: '90%',
    height: 900,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  categoryItem: {
    width: '80%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
    alignSelf: 'center',
  },
});
