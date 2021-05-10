import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderItemCard from '../../components/UI/cart/OrderItemCard';

const OrderListScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<OrderItemCard />
		</View>
	);
};

export default OrderListScreen;

const styles = StyleSheet.create({});
