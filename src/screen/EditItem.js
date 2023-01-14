import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../global/styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';

export default function EditItem({navigation}) {
  const route = useRoute();
  const [imageData, setImageData] = useState({
    assets: [{uri: route.params.data.imageUrl}],
  });
  const [name, setName] = useState(route.params.data.name);
  const [price, setPrice] = useState(route.params.data.price);
  //const [itemId, setItemId] = useState(route.params.data.itemId);
  const [discountPrice, setDiscountPrice] = useState(
    route.params.data.discountPrice,
  );
  const [description, setDescription] = useState(route.params.data.description);
  const [itmId, setItmId] = useState(route.params.data.itmId);
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState(route.params.data.categories); //2
  const [catId, setCatId] = useState(route.params.data.catId);

  // const categories = [
  //   {key: '1', value: 'Sơ mi'},
  //   {key: '2', value: 'Đầm'},
  //   {key: '3', value: 'Quần dài'},
  //   {key: '4', value: 'Set đồng bộ'},
  //   {key: '5', value: 'Khoác ngoài'},
  //   {key: '6', value: 'Phụ kiện'},
  // ];

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
  useEffect(() => {
    uploadImage();
  });

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
  const uploadItem = () => {
    firestore()
      .collection('items')
      .doc(route.params.id)
      .update({
        name: name,
        price: price,
        discountPrice: discountPrice,
        description: description,
        imageUrl: route.params.data.imageUrl + '',
        categories: categories, //1
        catId: catId,
        qty: 1,
        itmId: itmId,
      })
      .then(() => {
        console.log('User added!');
        navigation.goBack();
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Item</Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null}
        {/* <SelectList
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
        />  */}
        <TextInput
          placeholder="Id"
          style={styles.inputStyle}
          value={itmId}
          onChangeText={text => setItmId(text)}
        />
        <TextInput
          placeholder="Loại sản phẩm"
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
          placeholder="Item Name"
          style={styles.inputStyle}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Item Price"
          style={styles.inputStyle}
          value={price}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Item Discount Price"
          style={styles.inputStyle}
          value={discountPrice}
          onChangeText={text => setDiscountPrice(text)}
        />
        <TextInput
          placeholder="Item Description"
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
        <Text style={{alignSelf: 'center', marginTop: 20, color: colors.grey0}}>
          OR
        </Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text>chọn từ thư viện..</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={() => {
          uploadItem();
        }}>
        <Text style={{color: '#000', fontWeight: 'bold'}}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
  },
  imageStyle: {
    width: '90%',
    height: 900,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
