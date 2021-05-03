import React from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Card, Subheading, Title } from 'react-native-paper';
import { Colors } from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../models/Product';
interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { _id, price, title, image } = product;
	const navigation = useNavigation();
	const width = Dimensions.get('window').width;
	return (
		<TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetail', { product: product })}>
			<Card style={{ ...styles.card, width: width * 0.9, alignSelf: 'center', marginVertical: 20 }}>
				<Card.Cover source={{ uri: `https://eshopadminapp.herokuapp.com${image}` }} />
				<Card.Content>
					<Title style={{ marginVertical: 10 }}>{title}</Title>
					<Subheading style={{ fontSize: 20, color: Colors.primary, fontWeight: 'bold' }}>
						$ {price}
					</Subheading>
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
		}
});
