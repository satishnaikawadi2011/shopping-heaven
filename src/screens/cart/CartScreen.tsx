import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import { Button, FAB, Surface, Text, Title, Colors as MuiColors } from 'react-native-paper';
import { DEVICE_HEIGHT, DEVICE_WIDTH, INDIAN_RUPEE_SIGN } from '../../../constants';
import { Colors } from '../../../constants/colors';
import CartDetails from '../../components/UI/cart/CartDetails';
import CartItemTile from '../../components/UI/cart/CartItemTile';
import { CartItem } from '../../models/CartItem';
import { useCartStore } from '../../store/cart';
import { centered } from '../../utils/commonStyles';
import EmptyCartIcon from '../../icons/EmptyCartIcon';
import { useNavigation } from '@react-navigation/core';

const CartScreen = () => {
	const navigation = useNavigation();
	const cartItemListRef: any = useRef<React.LegacyRef<FlatList<CartItem>> | undefined>(null);
	const { cartItems, totalAmount, itemCount, clearCart } = useCartStore();
	const handleViewCartDetails = () => {
		cartItemListRef.current.scrollToEnd({ animated: true });
	};
	if (cartItems.length === 0) {
		return (
			<View style={centered}>
				<EmptyCartIcon height={150} width={150} />
				<Title style={styles.title}>Your cart is empty.</Title>
			</View>
		);
	}
	return (
		<React.Fragment>
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
										<CartDetails
											title="Cart Details"
											totalAmount={totalAmount()}
											totalItems={itemCount()}
										/>
									</View>
								);
							}
							return <CartItemTile cartItem={item} />;
						}}
					/>
					<FAB
						style={[
							styles.fab,
							{ backgroundColor: MuiColors.red600 }
						]}
						icon="cart-off"
						color={MuiColors.white}
						onPress={clearCart}
					/>
				</View>
				{cartItems.length > 0 && (
					<Surface style={styles.surface}>
						<View style={styles.totalAmount}>
							<Title>
								{INDIAN_RUPEE_SIGN}
								{totalAmount()}
							</Title>
							<Pressable onPress={handleViewCartDetails}>
								<Text style={{ color: Colors.primary, fontWeight: 'bold' }}>View cart details</Text>
							</Pressable>
						</View>
						<Button
							mode="contained"
							onPress={() => navigation.navigate('OrderSummary')}
							style={{ alignSelf: 'center' }}
							color={Colors.accent}
						>
							place order
						</Button>
					</Surface>
				)}
			</View>
		</React.Fragment>
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
	totalAmount: {},
	title:
		{
			fontSize: 20,
			marginVertical: 20
		},
	fab:
		{
			position: 'absolute',
			margin: 16,
			right: 0,
			top: 0
		}
});
