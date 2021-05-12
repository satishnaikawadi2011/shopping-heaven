import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList,  StyleSheet, View } from 'react-native';
import { Button,Title } from 'react-native-paper';

import CartButton from '../components/headerButtons/CartButton';
import CategoryList from '../components/UI/CategoryList';
import ProductCard from '../components/UI/ProductCard';
import useApi from '../hooks/useApi';
import SadEmojiIcon from '../icons/SadEmojiIcon';
import { ProductsStackParamList } from '../navigation/AppNavigator';
import { useProductStore } from '../store/product';
import { centered } from '../utils/commonStyles';
import productsApi from '../api/products'
import categoriesApi from '../api/categories'
import { useAuthStore } from '../store/auth';
import ErrorScreen from './ErrorScreen';
import AppActivityIndicator from '../animations/AppActivityIndicator';

type ProductListScreenNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductList'>;

type ProductListScreenRouteProp = RouteProp<ProductsStackParamList, 'ProductList'>;

interface ProductLisScreenProps{
	navigation: ProductListScreenNavigationProp;
	route:ProductListScreenRouteProp
}

const ProductListScreen:React.FC<ProductLisScreenProps> = ({navigation,route}) => {
	const { products,  categories, selectedCategory,setCategories,setProducts } = useProductStore();
	const {token} = useAuthStore()
	const categoriesRes = useApi(categoriesApi.getCategories)
	const productsRes = useApi(productsApi.getProducts)
		useEffect(() => {
			if (token) {
				request()
			}
		}, [token]);
	useEffect(() => {
		if (productsRes.data && categoriesRes.data) {
			setCategories(categoriesRes.data as any)
		setProducts(productsRes.data as any);
		}
	},[categoriesRes.data,productsRes.data])
	const request = () => {
		categoriesRes.request(token);
		productsRes.request(token);
	}
	const filteredProducts:any[] = selectedCategory ? products.filter(product => product.categoryId === selectedCategory?._id) : products;
	if (categoriesRes.loading || productsRes.loading) {
		return (
			<AppActivityIndicator visible={true}/>
		);
	}
	if (categoriesRes.error || productsRes.error) {
		return <ErrorScreen errorMessage='Could not load product listings !!' icon='alert' ButtonComponent={<Button mode='contained' onPress={request}>Try Again</Button>}/>
	}
	return (
		<View style={{flex:1}}>
			<CategoryList categories={categories} />
			{filteredProducts?.length === 0 ? <View style={[centered]}>
				<SadEmojiIcon height={150} width={150}/>
				<Title style={styles.title}>No products found !!</Title>
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
	title: {
		fontSize: 20,
		marginVertical:20
	}
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
			title: 'Add Address',
		}
	}
	return {
		title: 'Shopping Heaven',
		headerRight: () => (
			<CartButton />
		),
	}
};
