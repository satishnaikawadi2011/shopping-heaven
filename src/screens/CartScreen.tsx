import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import { Button, Surface, Text, Title } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../constants';
import { Colors } from '../../constants/colors';
import CartDetails from '../components/UI/CartDetails';
import CartItemTile from '../components/UI/app/CartItemTile';
import DoubleBlockButton from '../components/UI/app/DoubleBlockButton';
import { CartItem } from '../models/CartItem';
import { useCartStore } from '../store/cart';
import SelectAddressBottomSheet from '../components/UI/address/SelectAddressBottomSheet';
import { centered } from '../utils/commonStyles';
import EmptyCartIcon from '../icons/EmptyCartIcon';

const CartScreen = () => {
	const [
		bsVisible,
		setBsVisible
	] = useState(false);
	const cartItemListRef: any = useRef<React.LegacyRef<FlatList<CartItem>> | undefined>(null);
	const { cartItems, totalAmount, itemCount } = useCartStore();
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
			<SelectAddressBottomSheet visible={bsVisible} onBackdropPress={() => setBsVisible(false)} />
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
				{cartItems.length > 0 && (
					<Surface style={styles.surface}>
						<View style={styles.totalAmount}>
							<Title>${totalAmount()}</Title>
							<Pressable onPress={handleViewCartDetails}>
								<Text style={{ color: Colors.primary, fontWeight: 'bold' }}>View cart details</Text>
							</Pressable>
						</View>
						<Button
							mode="contained"
							onPress={() => setBsVisible(true)}
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
		}
});
