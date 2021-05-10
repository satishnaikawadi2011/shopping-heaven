import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Colors as MuiColors, Subheading, Chip, Title, useTheme } from 'react-native-paper';
import { DEVICE_WIDTH, INDIAN_RUPEE_SIGN } from '../../../../constants';
import { Order } from '../../../models/Order';
import AppIcon from '../app/AppIcon';

interface OrderItemProps {
	order: Order;
}

const OrderItemCard: React.FC<OrderItemProps> = ({ order }) => {
	const theme = useTheme();
	const orderedDate = new Date(order.createdAt);
	const arr = orderedDate.toDateString().split(' ');
	const myFormatedOrderedDate = `${arr[1]} ${arr[2]} , ${arr[3]}`;
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
		}
});
