import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import React from 'react';
import { Product } from '../models/Product';
import { screenOptions as ProductListScreenOptions } from '../screens/ProductListScreen';
import { screenOptions as ProductDetailScreenOptions } from '../screens/ProductDetailScreen';
import CartScreen from '../screens/cart/CartScreen';
import HomeTabNavigator from './HomeTabs';

export type ProductsStackParamList = {
	ProductList: undefined;
	ProductDetail: { product: Product };
	Cart: undefined;
};

const ProductsStackNavigator = createStackNavigator<ProductsStackParamList>();

const AppNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator screenOptions={defaltNavOptions}>
			<ProductsStackNavigator.Screen
				name="ProductList"
				component={HomeTabNavigator}
				options={ProductListScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name="ProductDetail"
				component={ProductDetailScreen}
				options={ProductDetailScreenOptions}
			/>
			<ProductsStackNavigator.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
		</ProductsStackNavigator.Navigator>
	);
};

export default AppNavigator;
