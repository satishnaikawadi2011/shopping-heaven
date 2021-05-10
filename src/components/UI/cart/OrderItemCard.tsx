import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { Surface, Text, Colors as MuiColors, Subheading, Chip, Title, useTheme } from 'react-native-paper';
import { DEVICE_WIDTH, IMAGE_URL_PREFIX, INDIAN_RUPEE_SIGN } from '../../../../constants';
import AppDivider from '../app/AppDivider';
import AppIcon from '../app/AppIcon';
import AppListItem from '../app/AppListItem';

const order = {
	__v: 0,
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
			postalCode: '94043',
			road: 'Santa Clara County',
			state: 'California'
		},
	shippingPrice: 0,
	taxPrice: 0,
	totalPrice: 2350,
	updatedAt: '2021-05-10T06:33:24.820Z',
	user: '5fdf5fcfe0ca7c552cd13529'
};

const OrderItemCard = () => {
	const [
		showItems,
		setShowItems
	] = useState(false);
	const animateHeight = useRef(new Animated.Value(0)).current;
	const theme = useTheme();
	const orderedDate = new Date(order.createdAt);
	const arr = orderedDate.toDateString().split(' ');
	const myFormatedOrderedDate = `${arr[1]} ${arr[2]} , ${arr[3]}`;
	const handleExpand = () => {
		setShowItems(true);
		Animated.timing(animateHeight, {
			toValue: 250,
			duration: 500,
			useNativeDriver: false
		}).start();
	};
	const handleShrink = () => {
		setShowItems(false);
		Animated.timing(animateHeight, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false
		}).start();
	};
	return (
		<Surface style={styles.surface}>
			<View
				style={[
					styles.row,
					{ justifyContent: 'space-between' }
				]}
			>
				<AppIcon
					name="truck-delivery"
					bgColor={

							order.isDelivered ? MuiColors.green500 :
							MuiColors.yellow500
					}
					iconColor={

							order.isDelivered ? MuiColors.white :
							MuiColors.black
					}
					size={70}
				/>

				<View style={styles.info}>
					<Title>{`Ordered On ${myFormatedOrderedDate}`}</Title>
					<Subheading style={{ marginRight: 20 }}>
						<Text style={styles.bold}>Total Price</Text> : {INDIAN_RUPEE_SIGN}
						{order.totalPrice}
					</Subheading>
					<Subheading>
						<Text style={styles.bold}>Total Items</Text> : {order.orderItems.length}
					</Subheading>
					<View
						style={[
							styles.row
						]}
					>
						<Chip
							style={[
								styles.chip,
								{
									backgroundColor:

											order.isDelivered ? MuiColors.green500 :
											MuiColors.yellow500
								}
							]}
						>
							<Text
								style={[
									styles.bold,
									{
										color:

												order.isDelivered ? MuiColors.white :
												MuiColors.black
									}
								]}
							>
								{
									order.isDelivered ? 'Delivered' :
									'On The Way'}
							</Text>
						</Chip>
						<Chip
							style={[
								styles.chip,
								{
									backgroundColor:

											order.isPaid ? MuiColors.green500 :
											MuiColors.yellow500
								}
							]}
						>
							<Text
								style={[
									styles.bold,
									{
										color:

												order.isPaid ? MuiColors.white :
												MuiColors.black
									}
								]}
							>
								{
									order.isPaid ? 'Paid' :
									'Payment Pending'}
							</Text>
						</Chip>
					</View>
				</View>
				<MaterialCommunityIcons
					style={{ alignSelf: 'center' }}
					name="chevron-right"
					size={40}
					color={theme.colors.text}
				/>
			</View>
			{!showItems && (
				<MaterialCommunityIcons
					size={40}
					name="chevron-down"
					color={theme.colors.text}
					style={styles.vertChevron}
					onPress={handleExpand}
				/>
			)}
			{
				<Animated.View style={{ height: animateHeight }}>
					{showItems && <Title style={{ textAlign: 'center', marginVertical: 10 }}>Order Items</Title>}
					<FlatList
						data={order.orderItems}
						ItemSeparatorComponent={AppDivider}
						keyExtractor={(item) => item.productId}
						renderItem={({ item }) => {
							return (
								<AppListItem
									image={{ uri: `${IMAGE_URL_PREFIX}${item.image}` }}
									title={item.title}
									subTitle={`${INDIAN_RUPEE_SIGN}${item.price} x ${item.qty} : ${INDIAN_RUPEE_SIGN}${item.price *
										item.qty} `}
								/>
							);
						}}
					/>
				</Animated.View>
			}
			{showItems && (
				<MaterialCommunityIcons
					size={40}
					name="chevron-up"
					color={theme.colors.text}
					style={styles.vertChevron}
					onPress={handleShrink}
				/>
			)}
		</Surface>
	);
};

export default OrderItemCard;

const styles = StyleSheet.create({
	surface:
		{
			padding: 8,
			alignSelf: 'center',
			width: DEVICE_WIDTH,
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 1
				},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3,
			marginVertical: 10
		},
	bold:
		{
			fontWeight: 'bold',
			fontFamily: 'UbuntuBold'
		},
	row:
		{
			flexDirection: 'row'
		},
	info:
		{
			flex: 1,
			marginHorizontal: 10
		},
	chip:
		{
			marginHorizontal: 5,
			marginVertical: 7
		},
	vertChevron:
		{
			alignSelf: 'center'
		}
});
