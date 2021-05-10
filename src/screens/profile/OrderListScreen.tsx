import React from 'react';
import { StyleSheet, View } from 'react-native';
import OrderItemCard from '../../components/UI/cart/OrderItemCard';

const order = {
	_id: '6098d3b0cc67bc000421f2ed',
	createdAt: '2021-05-10T06:33:20.588Z',
	isDelivered: false,
	isPaid: true,
	itemsPrice: 2350,
	orderItems:
		[
			{
				_id: '6098d3b0cc67bc000421f2ee',
				image: '/uploads/image-1620233318858.jpg',
				price: 250,
				productId: '6092cc4ab5bbf60004f85e08',
				qty: 3,
				title: 'Shoes'
			},
			{
				_id: '6098d3b0cc67bc000421f2ef',
				image: '/uploads/sample-product.jpg',
				price: 800,
				productId: '5fe24c90d64f460450722747',
				qty: 2,
				title: 'Sample Product'
			}
		],
	paidAt: '2021-05-10T06:33:24.810Z',
	paymentMethod: 'CreditCard',
	paymentResult:
		{
			amount: 2350,
			created: 1620628403,
			currency: 'inr',
			id: 'ch_1IpSgBSJpyqyuhlnxpnqVkr6',
			receipt_url:
				'https://pay.stripe.com/receipts/acct_1IolX5SJpyqyuhln/ch_1IpSgBSJpyqyuhlnxpnqVkr6/rcpt_JSNRggEWWtmKy0Wbtr5Vux3f8AACGS5'
		},
	shippingAddress:
		{
			building: 'Amphitheatre Parkway',
			city: 'Mountain View',
			country: 'United States',
			fullName: 'Satish Naikawadi',
			phoneNumber: '8975179022',
			pincode: '94043',
			road: 'Santa Clara County',
			state: 'California'
		},
	shippingPrice: 0,
	taxPrice: 0,
	totalPrice: 2350,
	updatedAt: '2021-05-10T06:33:24.820Z',
	user: '5fdf5fcfe0ca7c552cd13529'
};

const OrderListScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<OrderItemCard order={order} />
		</View>
	);
};

export default OrderListScreen;

const styles = StyleSheet.create({});
