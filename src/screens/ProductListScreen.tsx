import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import Screen from '../components/Screen';
import ProductCard from '../components/UI/ProductCard';
import { useProductStore } from '../store/product';

const ProductListScreen = () => {
	const { products, loading, fetchAndSetProducts, setLoading } = useProductStore();
	useEffect(() => {
		fetchAndSetProducts();
	}, []);
	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	return (
		<Screen>
			<FlatList
				keyExtractor={(item) => item._id}
				data={products}
				renderItem={({ item }) => {
					return <ProductCard product={item} />;
				}}
			/>
		</Screen>
	);
};

export default ProductListScreen;

const styles = StyleSheet.create({
	centered:
		{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}
});
