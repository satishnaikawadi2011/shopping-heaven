import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator,Text } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import Screen from '../components/Screen';
import CategoryList from '../components/UI/CategoryList';
import ProductCard from '../components/UI/ProductCard';
import { useProductStore } from '../store/product';
import { centered } from '../utils/commonStyles';

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
