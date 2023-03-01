import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductsDetail from './ProductsDetail';

export default function ProductDetailScreen({navigation, route}) {
  return <ProductsDetail del={route.params.product} />;
}

const styles = StyleSheet.create({});
