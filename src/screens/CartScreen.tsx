import React, { useRef } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import { Button, Surface, Text, Title } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../constants';
import { Colors } from '../../constants/colors';
import CartDetails from '../components/UI/CartDetails';
import CartItemTile from '../components/UI/CartItemTile';
import DoubleBlockButton from '../components/UI/DoubleBlockButton';
import { CartItem } from '../models/CartItem';
import { useCartStore } from '../store/cart';

const CartScreen = () => {
	const cartItemListRef: any = useRef<React.LegacyRef<FlatList<CartItem>> | undefined>(null);
	const { cartItems, totalAmount, itemCount } = useCartStore();
	const handleViewCartDetails = () => {
		cartItemListRef.current.scrollToEnd({ animated: true });
	};
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<Title style={{ alignSelf: 'center', marginVertical: 20, fontSize: 25 }}>Cart Items</Title>
				<FlatList
					ref={cartItemListRef}
					keyExtractor={(item) => item._id}
					data={cartItems}
					renderItem={({ item, index }) => {
						if (index === cartItems.length - 1) {
							return (
								<View>
									<CartItemTile cartItem={item} />
									<CartDetails totalAmount={totalAmount()} totalItems={itemCount()} />
								</View>
							);
						}
						return <CartItemTile cartItem={item} />;
					}}
				/>
			</View>
			<Surface style={styles.surface}>
				<View style={styles.totalAmount}>
					<Title>${totalAmount()}</Title>
					<Pressable onPress={handleViewCartDetails}>
						<Text style={{ color: Colors.primary, fontWeight: 'bold' }}>View cart details</Text>
					</Pressable>
				</View>
				<Button mode="contained" style={{ alignSelf: 'center' }} color={Colors.accent}>
					place order
				</Button>
			</Surface>
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	surface:
		{
			width: DEVICE_WIDTH,
			flexDirection: 'row',
			justifyContent: 'space-between',
			padding: 10,
			marginBottom: 5,
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 2
				},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,

			elevation: 5
		},
	totalAmount: {}
});
