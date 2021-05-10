import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FavouritesScreen from '../screens/profile/FavouritesScreen';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import AddressListScreen, { screenOptions as AddressListScreenOptions } from '../screens/profile/AddressListScreen';
import OrderListScreen from '../screens/profile/OrderListScreen';

const StackNavigator = createStackNavigator();

const ProfileStackNavigator = () => {
	return (
		<StackNavigator.Navigator screenOptions={defaltNavOptions}>
			<StackNavigator.Screen name="Profile" component={ProfileScreen} />
			<StackNavigator.Screen name="Favourites" component={FavouritesScreen} />
			<StackNavigator.Screen name="Addresses" component={AddressListScreen} options={AddressListScreenOptions} />
			<StackNavigator.Screen name="Orders" component={OrderListScreen} options={{ title: 'Your Orders' }} />
		</StackNavigator.Navigator>
	);
};

export default ProfileStackNavigator;
