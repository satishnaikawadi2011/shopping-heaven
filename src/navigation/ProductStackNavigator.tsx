import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import React from 'react';
import { Product } from '../models/Product';

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
				options={{ title: 'Shopping Heaven' }}
				// options={NotificationScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name="ProductDetail"
				component={ProductDetailScreen}
				options={({ route }) => ({
					title: route.params.product.title
				})}
				// options={DetailScreenOptions}
			/>
		</ProductsStackNavigator.Navigator>
	);
};
