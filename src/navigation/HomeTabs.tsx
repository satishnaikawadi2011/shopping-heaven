import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackNavigator from './ProfileStackNavigator';
import AddAddressScreen from '../screens/AddAddressScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomAddAddressTabButton from '../components/navigation/CustomAddAddressTabButton';
import { Colors } from '../../constants/colors';

const TabNavigator = createBottomTabNavigator();

const HomeTabNavigator = () => {
	return (
		<TabNavigator.Navigator tabBarOptions={{ activeTintColor: Colors.primary, keyboardHidesTabBar: true }}>
			<TabNavigator.Screen
				name="Home"
				component={ProductListScreen}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />
				}}
			/>
			<TabNavigator.Screen
				name="AddAddress"
				component={AddAddressScreen}
				options={({ navigation }) => ({
					tabBarButton: () => <CustomAddAddressTabButton onPress={() => navigation.navigate('AddAddress')} />
				})}
			/>
			<TabNavigator.Screen
				name="Profile"
				component={ProfileStackNavigator}
				options={{
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons color={color} size={size} name="account" />
				}}
			/>
		</TabNavigator.Navigator>
	);
};

export default HomeTabNavigator;
