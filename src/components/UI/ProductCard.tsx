import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { Card, Chip, Subheading, Title,Colors as MuiColors } from 'react-native-paper';
import { Colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../models/Product';
import { useProductStore } from '../../store/product';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavouritesStore } from '../../store/favourites';

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { categoryId, price, title, image } = product;
	const { categories } = useProductStore()
	const { addToFavourites,removeFromFavourites,isFavourite} = useFavouritesStore();
	const category = categories.find(cat => cat._id === categoryId)
	const navigation = useNavigation();
	const width = Dimensions.get('window').width;
	const isInFavourites = isFavourite(product._id)
	return (
		<TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetail', { product: product })}>
			<Card style={{ ...styles.card, width: width * 0.9, alignSelf: 'center', marginVertical: 20 }}>
				<Card.Cover source={{ uri: `https://eshopadminapp.herokuapp.com${image}` }} />
				<Card.Content style={styles.content}>
					<View>
											<Title style={{ marginVertical: 10 }}>{title}</Title>
					<Subheading style={{ fontSize: 20, color: Colors.primary, fontWeight: 'bold' }}>
						$ {price}
					</Subheading>
					</View>
					<View style={styles.row}>
						{isInFavourites ? <MaterialCommunityIcons color={MuiColors.pink600} size={35} name='heart' onPress={() => removeFromFavourites(product._id)} /> : <MaterialCommunityIcons color={Colors.primary} size={35} name='heart-outline' onPress={() => addToFavourites(product)}/> }
						<Chip style={styles.chip}>
							{category?.name}
						</Chip>
					</View>
				</Card.Content>
			</Card>
		</TouchableWithoutFeedback>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	card:
		{
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 1
				},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center'
	},
	chip: {
		backgroundColor: Colors.primary,
		marginLeft:10
	},
	row: {
		flexDirection:'row'
	}
});
