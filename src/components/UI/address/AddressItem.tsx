import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Title, useTheme, Colors as MuiColors } from 'react-native-paper';
import { DEVICE_WIDTH } from '../../../../constants';
import { Address } from '../../../models/Address';

interface AddressItemProps {
	address: Address;
	TailingComponent?: any;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, TailingComponent }) => {
	const { building, city, fullName, country, phoneNumber, pincode, road, state, id } = address;
	const theme = useTheme();
	return (
		<Surface style={styles.surface}>
			<View style={styles.firstContainer}>
				<MaterialCommunityIcons style={styles.icon} name="city-variant" size={40} color={theme.colors.text} />
			</View>
			<View style={styles.secondContainer}>
				<View
					style={[
						styles.container
					]}
				>
					<Title>{fullName}</Title>
				</View>
				<View style={styles.container}>
					<Text style={styles.text}>
						{building},{road},{city},{state} - {pincode}
					</Text>
				</View>
				<View style={styles.container}>
					<Text style={styles.text}>{phoneNumber}</Text>
				</View>
			</View>
			<View style={styles.thirdContainer}>{TailingComponent}</View>
		</Surface>
	);
};

export default AddressItem;

const styles = StyleSheet.create({
	firstContainer:
		{
			width: '20%'
		},
	secondContainer:
		{
			flex: 1
		},
	thirdContainer:
		{
			width: '10%'
		},
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
			padding: 10,
			flexDirection: 'row',
			alignItems: 'flex-start',
			width: DEVICE_WIDTH
		},
	container:
		{
			marginVertical: 7
		},
	text:
		{
			fontSize: 17
		},
	icon:
		{
			marginHorizontal: 10
		}
});
