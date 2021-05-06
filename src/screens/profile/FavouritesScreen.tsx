import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ProductCard from '../../components/UI/ProductCard';
import { getFavouritesDataFromAsyncStorage, useFavouritesStore } from '../../store/favourites';
import { centered } from '../../utils/commonStyles';

const FavouritesScreen = () => {
	const { products } = useFavouritesStore();
	// useEffect(() => {
	// 	const getFavouritesData = async () => {
	// 		const favouritesData = await getFavouritesDataFromAsyncStorage();
	// 		if (favouritesData) {
	// 			setProducts(favouritesData.favourites);
	// 			setProductIds(favouritesData.ids);
	// 		}
	// 	};
	// 	getFavouritesData();
	// }, []);
	return (
		<View style={{ flex: 1 }}>
			{
				products.length === 0 ? <View
					style={[
						centered
					]}
				>
					<Text>You don't have any favourites.Add some.</Text>
				</View> :
				<FlatList
					keyExtractor={(item) => item._id}
					data={products}
					renderItem={({ item }) => {
						return <ProductCard product={item} />;
					}}
				/>}
		</View>
	);
};

export default FavouritesScreen;

const styles = StyleSheet.create({});
