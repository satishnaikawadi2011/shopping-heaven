import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import ProductCard from '../../components/UI/ProductCard';
import { useFavouritesStore } from '../../store/favourites';
import { centered } from '../../utils/commonStyles';
import FavouriteIcon from '../../icons/FavouriteIcon';

const FavouritesScreen = () => {
	const { products } = useFavouritesStore();
	return (
		<View style={{ flex: 1 }}>
			{
				products.length === 0 ? <View
					style={[
						centered
					]}
				>
					<FavouriteIcon height={150} width={150} />
					<Title style={styles.title}>You don't have any favourites.Add some.</Title>
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

const styles = StyleSheet.create({
	title:
		{
			fontSize: 20,
			marginVertical: 20
		}
});
