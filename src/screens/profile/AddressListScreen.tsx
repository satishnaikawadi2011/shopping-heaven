import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, Colors as MuiColors } from 'react-native-paper';
import AddressItem from '../../components/UI/address/AddressItem';
import AppDivider from '../../components/UI/app/AppDivider';
import { useAddressStore } from '../../store/address';
import { centered } from '../../utils/commonStyles';

const AddressListScreen = () => {
	const { addresses, removeAddress } = useAddressStore();
	return (
		<View style={{ flex: 1 }}>
			{
				addresses.length === 0 ? <View
					style={[
						centered
					]}
				>
					<Text>You don't have any addresses added.</Text>
				</View> :
				<FlatList
					ItemSeparatorComponent={AppDivider}
					keyExtractor={(item) => item.id}
					data={addresses}
					renderItem={({ item }) => {
						return (
							<AddressItem
								address={item}
								TailingComponent={
									<MaterialCommunityIcons
										onPress={() => removeAddress(item.id)}
										name="delete"
										size={30}
										color={MuiColors.red600}
									/>
								}
							/>
						);
					}}
				/>}
		</View>
	);
};

export default AddressListScreen;

const styles = StyleSheet.create({});
