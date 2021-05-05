import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export type AuthStackParamList = {
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
};

const StackNavigator = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
	return (
		<StackNavigator.Navigator screenOptions={{ headerShown: false }}>
			<StackNavigator.Screen name="Welcome" component={WelcomeScreen} />
			<StackNavigator.Screen name="Login" component={LoginScreen} />
			<StackNavigator.Screen name="Register" component={SignupScreen} />
		</StackNavigator.Navigator>
	);
};

export default AuthNavigator;
