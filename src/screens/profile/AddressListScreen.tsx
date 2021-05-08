import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors as MuiColors, Title } from 'react-native-paper';
import AddButton from '../../components/headerButtons/AddButton';
import AddressItem from '../../components/UI/address/AddressItem';
import AppDivider from '../../components/UI/app/AppDivider';
import AddressIcon from '../../icons/AddressIcon';
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
					<AddressIcon height={150} width={150} />
					<Title style={styles.title}>You don't have any addresses added.</Title>
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

const styles = StyleSheet.create({
	title:
		{
			fontSize: 20,
			marginVertical: 20
		}
});

export const screenOptions:
	| StackNavigationOptions
	| ((
			props: {
				route: RouteProp<Record<string, object | undefined>, 'Addresses'>;
				navigation: any;
			}
		) => StackNavigationOptions)
	| undefined = ({ navigation, route }) => {
	return {
		headerRight: () => <AddButton />
	};
};
