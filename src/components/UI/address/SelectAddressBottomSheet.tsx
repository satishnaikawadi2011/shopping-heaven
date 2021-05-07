import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { RadioButton, Text, Title } from 'react-native-paper';
import { DEVICE_HEIGHT } from '../../../../constants';
import { Colors } from '../../../../constants/colors';
import { useAddressStore } from '../../../store/address';
import { centered } from '../../../utils/commonStyles';
import AppDivider from '../app/AppDivider';
import AddressItem from './AddressItem';

interface AddressBottomSheetProps {
	visible: boolean;
	onBackdropPress?: () => void;
	onBackButtonPress?: () => void;
}

const SelectAddressBottomSheet: React.FC<AddressBottomSheetProps> = ({
	visible,
	onBackButtonPress,
	onBackdropPress
}) => {
	const theme = useTheme();
	const { addresses, preferredAddress, setPreferredAddress } = useAddressStore();
	const handleRadioButtonChange = (newValue: any) => {
		const updatedPrefferedAddress = addresses.find((address) => address.id === newValue);
		if (updatedPrefferedAddress) {
			setPreferredAddress(updatedPrefferedAddress);
		}
	};
	return (
		<BottomSheet visible={visible} onBackButtonPress={onBackButtonPress} onBackdropPress={onBackdropPress}>
			<View
				style={[
					styles.bottomSheetView,
					{ backgroundColor: theme.colors.background }
				]}
			>
				<Title style={styles.title}>Select Address</Title>
				{
					addresses.length === 0 ? <View
						style={[
							centered
						]}
					>
						<Text>You don't have any addresses added.</Text>
					</View> :
					<View style={{ flex: 1 }}>
						<RadioButton.Group onValueChange={handleRadioButtonChange} value={preferredAddress!.id}>
							<FlatList
								ItemSeparatorComponent={AppDivider}
								keyExtractor={(item) => item.id}
								data={addresses}
								renderItem={({ item }) => {
									return (
										<AddressItem
											address={item}
											TailingComponent={<RadioButton value={item.id} />}
										/>
									);
								}}
							/>
						</RadioButton.Group>
					</View>}
			</View>
		</BottomSheet>
	);
};

export default SelectAddressBottomSheet;

const styles = StyleSheet.create({
	bottomSheetView:
		{
			height: DEVICE_HEIGHT * 0.8
			// flex: 1
		},
	title:
		{
			alignSelf: 'center',
			color: Colors.primary,
			marginVertical: 30,
			fontSize: 25
		}
});
