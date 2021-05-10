import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import ordersApi from '../../api/orders';
import OrderItemCard from '../../components/UI/cart/OrderItemCard';
import { Order } from '../../models/Order';
import { ProfileStackNavProps } from '../../navigation/ProfileStackNavigator';
import { useAuthStore } from '../../store/auth';
import { useOrderStore } from '../../store/orders';
import { centered } from '../../utils/commonStyles';
import ErrorScreen from '../ErrorScreen';

const OrderListScreen = ({ navigation }: ProfileStackNavProps<'Orders'>) => {
	const { token } = useAuthStore();
	const [
		loading,
		setLoading
	] = useState(false);
	const [
		error,
		setError
	] = useState(false);
	const { orders, setOrders } = useOrderStore();
	useEffect(() => {
		loadOrders();
	}, []);
	const loadOrders = async () => {
		setLoading(true);
		const response = await ordersApi.getOrdersRelatedToUser(token);
		setLoading(false);
		if (!response.ok) {
			return setError(true);
		}
		setError(false);
		const fetchedOrders = transformOrders(response.data as any);
		setOrders(fetchedOrders);
	};
	if (error) {
		return (
			<ErrorScreen
				errorMessage={'Could not fetch orders!!'}
				ButtonComponent={
					<Button onPress={loadOrders} mode="contained">
						Retry
					</Button>
				}
				icon="alert"
			/>
		);
	}
	if (loading) {
		return (
			<View style={centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={orders}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<OrderItemCard
							order={item}
							onTrailingIconPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}
						/>
					);
				}}
			/>
		</View>
	);
};

export default OrderListScreen;

const styles = StyleSheet.create({
	container:
		{
			flex: 1
		}
});

const transformOrders = (orders: any[]): Order[] => {
	const transformedOrders: Order[] = orders.map((order) => {
		const { building, city, country, fullName, phoneNumber, road, state, postalCode } = order.shippingAddress;
		const { amount, created, currency, id, receipt_url } = order.paymentResult;
		return {
			_id: order._id,
			createdAt: order.createdAt,
			isDelivered: order.isDelivered,
			isPaid: order.isPaid,
			itemsPrice: order.itemsPrice,
			orderItems: order.orderItems,
			paymentMethod: order.paymentMethod,
			shippingAddress:
				{
					building,
					city,
					country,
					fullName,
					phoneNumber,
					road,
					state,
					pincode: postalCode
				},
			shippingPrice: order.shippingPrice,
			taxPrice: order.taxPrice,
			totalPrice: order.totalPrice,
			updatedAt: order.updatedAt,
			user: order.user,
			deliveredAt: order.deliveredAt,
			paidAt: order.paidAt,
			paymentResult:
				{
					amount,
					created,
					currency,
					id,
					receipt_url
				}
		};
	});
	return transformedOrders;
};
