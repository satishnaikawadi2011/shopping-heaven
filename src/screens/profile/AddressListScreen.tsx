import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AddressItem from '../../components/UI/AddressItem';
import AppDivider from '../../components/UI/app/AppDivider';
import { useAddressStore } from '../../store/address';
import { centered } from '../../utils/commonStyles';

const AddressListScreen = () => {
	const { addresses } = useAddressStore();
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
						return <AddressItem address={item} />;
					}}
				/>}
		</View>
	);
};

export default AddressListScreen;

const styles = StyleSheet.create({});
