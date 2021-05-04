import { RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { ActivityIndicator,Text } from 'react-native-paper';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { Colors } from '../../constants/colors';
import CartButton from '../components/headerButtons/CartButton';
import CustomHeaderButton from '../components/navigation/CustomHeaderButton';
import Screen from '../components/Screen';
import CategoryList from '../components/UI/CategoryList';
import CustomBadge from '../components/UI/CustomBadge';
import ProductCard from '../components/UI/ProductCard';
import { ProductsStackParamList } from '../navigation/ProductStackNavigator';
import { useProductStore } from '../store/product';
import { centered } from '../utils/commonStyles';

type ProductListScreenNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductList'>;

type ProductListScreenRouteProp = RouteProp<ProductsStackParamList, 'ProductList'>;

const ProductListScreen = () => {
	const { products, loading, fetchAndSetProductsAndCategories, categories,selectedCategory } = useProductStore();
	useEffect(() => {
		fetchAndSetProductsAndCategories();
	}, []);
	const filteredProducts = selectedCategory ? products.filter(product => product.categoryId === selectedCategory?._id) : products;
	if (loading) {
		return (
			<View style={centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	return (
		<View style={{flex:1}}>
			<CategoryList categories={categories} />
			{filteredProducts.length === 0?<View style={[centered]}>
				<Text>No products found !!</Text>
			</View> :
			<FlatList
				keyExtractor={(item) => item._id}
				data={filteredProducts}
					renderItem={({ item }) => {
					return <ProductCard product={item} />;
				}}
			
			/>}
		</View>
	);
};

export default ProductListScreen;

const styles = StyleSheet.create({
});


export const screenOptions:StackNavigationOptions | ((props: {
    route: RouteProp<ProductsStackParamList, "ProductList">;
	navigation: any;
}) => StackNavigationOptions) | undefined = (navData) => {
	return {
		title: 'Shopping Heaven',
		headerRight : () => (
			<CartButton/>
		),

		// headerLeft  : () => (
		// 	<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
		// 		<Item
		// 			title="Menu"
		// 			iconName={

		// 					Platform.OS === 'android' ? 'md-menu' :
		// 					'ios-menu'
		// 			}
		// 			onPress={() => {
		// 				navData.navigation.toggleDrawer();
		// 			}}
		// 		/>
		// 	</HeaderButtons>
		// )
	};
};
