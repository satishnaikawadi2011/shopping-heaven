import { RouteProp, useNavigation } from '@react-navigation/core';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Paragraph, Snackbar, Subheading, Title, useTheme } from 'react-native-paper';
import { INDIAN_RUPEE_SIGN } from '../../constants';
import { Colors } from '../../constants/colors';
import CartButton from '../components/headerButtons/CartButton';
import AppButton from '../components/UI/app/Button';
import DoubleBlockButton from '../components/UI/app/DoubleBlockButton';
import { ProductsStackParamList } from '../navigation/AppNavigator';
import { useCartStore } from '../store/cart';
import { useProductStore } from '../store/product';

type ProductDetailScreenNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductDetail'>;

type ProductDetailScreenRouteProp = RouteProp<ProductsStackParamList, 'ProductDetail'>;

interface ProductDetailScreenProps {
	route: ProductDetailScreenRouteProp;
	navigation: ProductDetailScreenNavigationProp;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
	const [snackbarVisible, setSnackbarVisible] = useState(false)
	const theme = useTheme();
	const product = route.params.product;
	const { addToCart} = useCartStore()
	const {categories} = useProductStore()
	const category = categories.find(category => category._id === product.categoryId)
	const handleAddToCart = () => {
		addToCart({ id: product._id, image: product.image, price: product.price, title: product.title })
		setSnackbarVisible(true);
	}
	return (
		<View style={{ flex: 1 }}>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
			duration={3000}>
				{'Added to cart successfully'}
      </Snackbar>
			<View style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Image style={styles.image} source={{ uri: `https://eshopadminapp.herokuapp.com${product.image}` }} />
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<Title style={styles.title}>{product.title}</Title>
							<Subheading style={styles.subHeading}>{INDIAN_RUPEE_SIGN}{product.price}</Subheading>
				</View>
				<Divider style={{ height: 0.2, backgroundColor: theme.colors.placeholder }} />
				<View style={{ flex: 1 }}>
						<View style={styles.subContainer}>
							<Title>Details</Title>
							<Paragraph>{product.description}</Paragraph>
						</View>
						<View style={styles.subContainer}>
							<Title>Category</Title>
							<Subheading>{category?.name}</Subheading>
						</View>
				</View>
			</View>
				</ScrollView>
			</View>
	<DoubleBlockButton
				leftButtonProps={{ label: 'add to cart', icon: 'cart-plus',onPress:handleAddToCart }}
				rightButtonProps={{ label: 'buy now', onPress: () => {} }}
			/>
		</View>
	);
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
	image:
		{
			width: '100%',
			height: 350
		},
	container:
		{
			padding: 20,
			flex: 1
		},
	subHeading:
		{
			fontSize: 20
		},
	title:
		{
			fontSize: 25,
			fontWeight: 'bold'
		},
	subContainer:
		{
			marginVertical: 8
		},
	buttonsContainer:
		{
			width: '100%'
		}
});


export const screenOptions:StackNavigationOptions | ((props: {
    route: RouteProp<ProductsStackParamList, "ProductDetail">;
	navigation: any;
}) => StackNavigationOptions) | undefined = ({navigation,route}) => {
	return {
		title: route.params.product.title,
		headerRight : () => (
			<CartButton/>
		),
	};
};