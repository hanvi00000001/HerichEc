import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screen/Splash';
import Login from './screen/Login';
import Dashboard from './screen/Dashboard';
import EditItem from './screen/EditItem';
import SelectLogin from './screen/user/SelectLogin';
import UserLogin from './screen/user/UserLogin';
import UserSignup from './screen/user/UserSignup';
import Home from './screen/user/Home';
import Cart from './screen/user/Cart';
import Checkout from './screen/user/checkout/Checkout';
import Address from './screen/user/checkout/Address';
import AddNewAddress from './screen/user/checkout/AddNewAddress';

import OrderStatus from './screen/user/checkout/OrderStatus';

import Guarantee from './screen/user/p_tabs/Guarantee';
import BaoMat from './screen/user/p_tabs/BaoMat';
import VanChuyen from './screen/user/p_tabs/VanChuyen';
import Herich from './screen/user/p_tabs/Herich';
import EditProfile from './screen/user/p_tabs/EditProfile';
import {colors} from './global/styles';
import Settings from './screen/user/p_tabs/Settings';
import Sizechart from './screen/user/products/Sizechart';
import ProductDetailScreen from './screen/user/products/ProductDetailScreen';
import ProductsDetail from './screen/user/products/ProductsDetail';
import CategoriesCard from './screen/common/CategoriesCard';
import ProductCat from './screen/user/products/ProductCat';
import Newsp from './screen/user/home_tabs/isnew/Newsp';
import Wish from './screen/user/home_tabs/Wishlist';
import OrdersList from './screen/user/checkout/OrdersList';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash} //keytool -list -v -keystore C:/Users/hangv/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wish"
          component={Wish}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLogin"
          component={SelectLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserSignup"
          component={UserSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: true, title: 'Gi??? h??ng'}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true, title: '?????t h??ng'}}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewAddress"
          component={AddNewAddress}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductsDetail"
          component={ProductsDetail}
          options={{headerShown: true, title: 'Th??ng tin s???n ph???m'}}
        />
        <Stack.Screen
          name="Sizechart"
          component={Sizechart}
          options={{headerShown: true, title: 'B???ng size'}}
        />
        <Stack.Screen
          name="OrderStatus"
          component={OrderStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Guarantee"
          component={Guarantee}
          options={{headerShown: true, title: 'Ch??nh s??ch b???o h??nh'}}
        />
        <Stack.Screen
          name="BaoMat"
          component={BaoMat}
          options={{headerShown: true, title: 'Ch??nh s??ch b???o m???t'}}
        />
        <Stack.Screen
          name="VanChuyen"
          component={VanChuyen}
          options={{headerShown: true, title: 'Ch??nh s??ch V???n chuy???n'}}
        />
        <Stack.Screen
          name="Herich"
          component={Herich}
          options={{headerShown: true, title: 'V??? Herich'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            title: 'S???a th??ng tin',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            title: 'C??i ?????t',
          }}
        />
        <Stack.Screen
          name="CategoriesCard"
          component={CategoriesCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductCat"
          component={ProductCat}
          options={{
            headerShown: true,
            title: 'Danh m???c s???n ph???m',
          }}
        />
        <Stack.Screen
          name="Newsp"
          component={Newsp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrdersList"
          component={OrdersList}
          options={{headerShown: true, title: 'Th??ng tin ????n h??ng'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
