import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface, Title } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../../constants';
import AppDivider from './AppDivider';

interface CartDetailsProps {
	totalItems: number;
	totalAmount: number;
	taxes?: number;
}

const CartDetails: React.FC<CartDetailsProps> = ({ totalAmount, totalItems, taxes }) => {
	const actualTax =
		taxes ? taxes :
		0;
	return (
		<Surface style={styles.surface}>
			<View>
				<Title>Cart Details</Title>
			</View>
			<AppDivider />
			<View style={styles.subheading}>
				<View>
					<Text style={styles.bold}>Total Items </Text>
				</View>
				<View>
					<Text>{totalItems}</Text>
				</View>
			</View>
			<View style={styles.subheading}>
				<View>
					<Text style={styles.bold}>Price ({totalItems} items)</Text>
				</View>
				<View>
					<Text>${totalAmount}</Text>
				</View>
			</View>
			<View style={styles.subheading}>
				<View>
					<Text style={styles.bold}>Taxes </Text>
				</View>
				<View>
					<Text>{taxes || 'Free'}</Text>
				</View>
			</View>
			<AppDivider />
			<View style={styles.subheading}>
				<View>
					<Title>Total Amount</Title>
				</View>
				<View>
					<Title style={{ color: 'green' }}>${totalAmount + actualTax}</Title>
				</View>
			</View>
		</Surface>
	);
};

export default CartDetails;

const styles = StyleSheet.create({
	surface:
		{
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 2
				},
			shadowOpacity: 0.23,
			shadowRadius: 2.62,

			elevation: 4,
			padding: 20,
			width: DEVICE_WIDTH
		},
	bold:
		{
			fontWeight: 'bold',
			fontSize: 15
		},
	subheading:
		{
			justifyContent: 'space-between',
			flexDirection: 'row',
			marginVertical: 3
		}
});
