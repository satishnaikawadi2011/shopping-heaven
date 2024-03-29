import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {  Button, Text } from 'react-native-paper';
import AppActivityIndicator from '../../animations/AppActivityIndicator';
import ordersApi from '../../api/orders';
import OrderItemCard from '../../components/UI/cart/OrderItemCard';
import useApi from '../../hooks/useApi';
import NoOrdersIcon from '../../icons/NoOrdersIcon';
import { Order, PaymentResult } from '../../models/Order';
import { ProfileStackNavProps } from '../../navigation/ProfileStackNavigator';
import { useAuthStore } from '../../store/auth';
import { useOrderStore } from '../../store/orders';
import { centered } from '../../utils/commonStyles';
import ErrorScreen from '../ErrorScreen';

const OrderListScreen = ({ navigation }: ProfileStackNavProps<'Orders'>) => {
	const { token } = useAuthStore();
	const { data, error, loading, request: loadOrders } = useApi(ordersApi.getOrdersRelatedToUser);
	const { orders, setOrders } = useOrderStore();
	useEffect(() => {
		loadOrders(token);
	}, []);
	useEffect(
		() => {
			if (data) {
				const fetchedOrders = transformOrders(data as any);
				setOrders(fetchedOrders);
			}
		},
		[
			data
		]
	);
	if (error) {
		return (
			<ErrorScreen
				errorMessage={'Could not fetch orders!!'}
				ButtonComponent={
					<Button onPress={() => loadOrders(token)} mode="contained">
						Retry
					</Button>
				}
				icon="alert"
			/>
		);
	}
	if (loading) {
		return (
			<AppActivityIndicator visible/>
		);
	}
	if (orders?.length === 0) {
		return <View style={centered}>
			<NoOrdersIcon width={100} height={100} />
			<Text style={{marginVertical:10}}>You have no orders !!</Text>
		</View>
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
		let paymentResult:PaymentResult | undefined;
		if (order.paymentResult) {
			const { amount, created, currency, id, receipt_url } = order?.paymentResult;
			paymentResult = {
				amount, created, currency, id, receipt_url
			}
		}
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
			paymentResult
		};
	});
	return transformedOrders;
};
