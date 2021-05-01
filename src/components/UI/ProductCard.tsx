import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Subheading, Title } from 'react-native-paper';
import { Colors } from '../../../constants/colors';

interface ProductCardProps {
	coverUri: string;
	title: string;
	price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ coverUri, title, price }) => {
	return (
		<Card>
			<Card.Cover source={{ uri: coverUri }} />
			<Card.Content>
				<Title style={{ marginVertical: 10 }}>{title}</Title>
				<Subheading style={{ fontSize: 20, color: Colors.primary, fontWeight: 'bold' }}>$ {price}</Subheading>
			</Card.Content>
		</Card>
	);
};

export default ProductCard;

const styles = StyleSheet.create({});
