import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Subheading, Surface, Text, Title } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../../constants';
import { CartItem } from '../../models/CartItem';
import { useCartStore } from '../../store/cart';
import DoubleBlockButton from './DoubleBlockButton';

interface CartTItemileProps {
	cartItem: CartItem;
}

const CartItemTile: React.FC<CartTItemileProps> = ({ cartItem }) => {
	const { addToCart, removeFromCart } = useCartStore();
	const { _id, image, price, quantity, title } = cartItem;
	const handleAddMore = () => {
		addToCart({ id: _id, image, price, title });
	};
	const handleRemove = () => {
		removeFromCart(_id);
	};
	return (
		<Surface style={styles.surface}>
			<View style={{ flexDirection: 'row' }}>
				<Image style={styles.image} source={{ uri: `https://eshopadminapp.herokuapp.com${image}` }} />
				<View style={styles.info}>
					<Title>{title}</Title>
					<View style={{ flexDirection: 'row' }}>
						<Subheading style={{ marginRight: 20 }}>
							<Text style={styles.bold}>Price</Text> : ${price}
						</Subheading>
						<Subheading>
							<Text style={styles.bold}>Quantity</Text> : {quantity}
						</Subheading>
					</View>
					<Subheading>
						<Text style={styles.bold}>Subtotal</Text> : ${price * quantity}
					</Subheading>
				</View>
			</View>
			<View style={{ marginTop: 15 }}>
				<DoubleBlockButton
					leftButtonProps={{ label: 'add more', icon: 'plus', onPress: handleAddMore }}
					rightButtonProps={{ label: 'remove', onPress: handleRemove, icon: 'delete-outline' }}
				/>
			</View>
		</Surface>
	);
};

export default CartItemTile;

const styles = StyleSheet.create({
	surface:
		{
			padding: 8,
			alignSelf: 'center',
			width: DEVICE_WIDTH * 0.95,
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 1
				},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3,
			// borderRadius: 10,
			marginVertical: 10
		},
	image:
		{
			width: 100,
			height: 100,
			borderRadius: 15,
			marginRight: 20
		},
	info:
		{
			flex: 1
		},
	bold:
		{
			fontWeight: 'bold',
			fontFamily: 'UbuntuBold'
		}
});
