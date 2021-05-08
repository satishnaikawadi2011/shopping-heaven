import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Platform, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../navigation/CustomHeaderButton';

const AddButton = () => {
	const navigation = useNavigation();
	return (
		<View style={{ marginRight: 10 }}>
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Add"
					iconName={

							Platform.OS === 'android' ? 'md-add' :
							'ios-add'
					}
					onPress={() => {
						navigation.navigate('AddAddress');
					}}
				/>
			</HeaderButtons>
		</View>
	);
};

export default AddButton;
