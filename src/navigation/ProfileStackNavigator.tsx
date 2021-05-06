import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FavouritesScreen from '../screens/profile/FavouritesScreen';
import { defaltNavOptions } from './options/defaultNavigationOptions';
import AddressListScreen from '../screens/profile/AddressListScreen';

const StackNavigator = createStackNavigator();

const ProfileStackNavigator = () => {
	return (
		<StackNavigator.Navigator screenOptions={defaltNavOptions}>
			<StackNavigator.Screen name="Profile" component={ProfileScreen} />
			<StackNavigator.Screen name="Favourites" component={FavouritesScreen} />
			<StackNavigator.Screen name="Addresses" component={AddressListScreen} />
		</StackNavigator.Navigator>
	);
};

export default ProfileStackNavigator;
