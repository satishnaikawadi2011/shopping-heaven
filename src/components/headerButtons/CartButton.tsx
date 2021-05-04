import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Platform, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../navigation/CustomHeaderButton';
import CustomBadge from '../UI/CustomBadge';

const CartButton = () => {
	const navigation = useNavigation();
	return (
		<View style={{ marginRight: 10 }}>
			<CustomBadge style={{ position: 'absolute', top: -10 }} />
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Cart"
					iconName={

							Platform.OS === 'android' ? 'md-cart' :
							'ios-cart'
					}
					onPress={() => {
						navigation.navigate('Cart');
					}}
				/>
			</HeaderButtons>
		</View>
	);
};

export default CartButton;
