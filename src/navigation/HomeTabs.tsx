import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackNavigator from './ProfileStackNavigator';
import AddAddressScreen from '../screens/AddAddressScreen';
import ProductListScreen from '../screens/ProductListScreen';

const TabNavigator = createBottomTabNavigator();

const HomeTabNavigator = () => {
	return (
		<TabNavigator.Navigator>
			<TabNavigator.Screen name="Home" component={ProductListScreen} />
			<TabNavigator.Screen name="AddAddress" component={AddAddressScreen} />
			<TabNavigator.Screen name="Profile" component={ProfileStackNavigator} />
		</TabNavigator.Navigator>
	);
};

export default HomeTabNavigator;
