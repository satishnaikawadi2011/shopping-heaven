import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FavouritesScreen from '../screens/profile/FavouritesScreen';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import AddressListScreen, { screenOptions as AddressListScreenOptions } from '../screens/profile/AddressListScreen';
import OrderListScreen from '../screens/profile/OrderListScreen';
import OrderDetailScreen from '../screens/profile/OrderDetailScreen';
import { RouteProp } from '@react-navigation/core';

export type ProfileStackParamList = {
	Profile: undefined;
	Favourites: undefined;
	Addresses: undefined;
	Orders: undefined;
	OrderDetails: { orderId: string };
};

export type ProfileStackNavProps<T extends keyof ProfileStackParamList> = {
	navigation: StackNavigationProp<ProfileStackParamList, T>;
	route: RouteProp<ProfileStackParamList, T>;
};

const StackNavigator = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
	return (
		<StackNavigator.Navigator screenOptions={defaltNavOptions}>
			<StackNavigator.Screen name="Profile" component={ProfileScreen} />
			<StackNavigator.Screen name="Favourites" component={FavouritesScreen} />
			<StackNavigator.Screen name="Addresses" component={AddressListScreen} options={AddressListScreenOptions} />
			<StackNavigator.Screen name="Orders" component={OrderListScreen} options={{ title: 'Your Orders' }} />
			<StackNavigator.Screen
				name="OrderDetails"
				component={OrderDetailScreen}
				options={{ title: 'Order Details' }}
			/>
		</StackNavigator.Navigator>
	);
};

export default ProfileStackNavigator;
