import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList,  StyleSheet, View } from 'react-native';
import { ActivityIndicator,Text } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import CartButton from '../components/headerButtons/CartButton';
import CategoryList from '../components/UI/CategoryList';
import ProductCard from '../components/UI/ProductCard';
import { ProductsStackParamList } from '../navigation/AppNavigator';
import { useFavouritesStore } from '../store/favourites';
import { useProductStore } from '../store/product';
import { centered } from '../utils/commonStyles';
import filterOddFromArray from '../utils/filterOddElements';

type ProductListScreenNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductList'>;

type ProductListScreenRouteProp = RouteProp<ProductsStackParamList, 'ProductList'>;

interface ProductLisScreenProps{
	navigation: ProductListScreenNavigationProp;
	route:ProductListScreenRouteProp
}

const ProductListScreen:React.FC<ProductLisScreenProps> = ({navigation,route}) => {
	const { products, loading, fetchAndSetProductsAndCategories, categories, selectedCategory } = useProductStore();
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
}) => StackNavigationOptions) | undefined = ({ route }) => {
	const routeName = getFocusedRouteNameFromRoute(route);
	if (routeName === 'Home') {
		return {
		title: 'Shopping Heaven',
		headerRight : () => (
			<CartButton/>
		),
	};	
	} else if (routeName === 'Profile') {
		return {
			headerShown:false
		}
	} else if(routeName === 'AddAddress'){
		return {
			title:'Add Address'
		}
	}
	return {
		title: 'Shopping Heaven',
		headerRight: () => (
			<CartButton />
		),
	}
};
