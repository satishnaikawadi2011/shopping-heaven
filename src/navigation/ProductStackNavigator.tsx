import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import React from 'react';
import { Product } from '../models/Product';
import { screenOptions as ProductListScreenOptions } from '../screens/ProductListScreen';
import { screenOptions as ProductDetailScreenOptions } from '../screens/ProductDetailScreen';

export type ProductsStackParamList = {
	ProductList: undefined;
	ProductDetail: { product: Product };
};

const ProductsStackNavigator = createStackNavigator<ProductsStackParamList>();

export const ProductsNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator screenOptions={defaltNavOptions}>
			{/* <ProductsStackNavigator.Screen name="ScreamsOverview" component={TabNavigator} options={screenOptions} /> */}
			<ProductsStackNavigator.Screen
				name="ProductList"
				component={ProductListScreen}
				options={ProductListScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name="ProductDetail"
				component={ProductDetailScreen}
				options={ProductDetailScreenOptions}
			/>
		</ProductsStackNavigator.Navigator>
	);
};
