import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Colors, IconButton, Subheading, Surface, Text, Title } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../../constants';
import { CartItem } from '../../models/CartItem';

interface CartTItemileProps {
	cartItem: CartItem;
}

const CartItemTile: React.FC<CartTItemileProps> = ({ cartItem }) => {
	const { image, price, quantity, title } = cartItem;
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
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
				<Button icon="plus" mode="contained" onPress={() => {}}>
					Add More
				</Button>
				<Button icon="delete" mode="contained" color={Colors.red500} onPress={() => {}}>
					Remove
				</Button>
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
					height: 2
				},
			shadowOpacity: 0.23,
			shadowRadius: 2.62,
			elevation: 4,
			borderRadius: 10
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
