import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, FlatList, Animated } from 'react-native';
import { Surface, Text, Colors as MuiColors, Subheading, Chip, Title, useTheme } from 'react-native-paper';
import { DEVICE_WIDTH, IMAGE_URL_PREFIX, INDIAN_RUPEE_SIGN } from '../../../../constants';
import { Order } from '../../../models/Order';
import AppDivider from '../app/AppDivider';
import AppIcon from '../app/AppIcon';
import AppListItem from '../app/AppListItem';

interface OrderItemProps {
	order: Order;
}

const OrderItemCard: React.FC<OrderItemProps> = ({ order }) => {
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
