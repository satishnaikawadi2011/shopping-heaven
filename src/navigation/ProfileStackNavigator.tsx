import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';

const StackNavigator = createStackNavigator();

const ProfileStackNavigator = () => {
	return (
		<StackNavigator.Navigator>
			<StackNavigator.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
		</StackNavigator.Navigator>
	);
};

export default ProfileStackNavigator;
