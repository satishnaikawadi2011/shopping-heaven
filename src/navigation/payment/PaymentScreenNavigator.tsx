import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import PaymentScreen from '../../screens/cart/PaymentScreen';
import OrderSuccessScreen from '../../animations/OrderSuccessScreen';
import OrderFailScreen from '../../animations/OrderFailScreen';

export type PaymentStackParamList = {
	PaymentHome: undefined;
	PaymentSuccess: undefined;
	PaymentFailure: undefined;
};

export type PaymentStackNavProps<T extends keyof PaymentStackParamList> = {
	navigation: StackNavigationProp<PaymentStackParamList, T>;
	route: RouteProp<PaymentStackParamList, T>;
};

const StackNavigator = createStackNavigator<PaymentStackParamList>();

const PaymentScreenNavigator = () => {
	return (
		<StackNavigator.Navigator screenOptions={{ headerShown: false }}>
			<StackNavigator.Screen name="PaymentHome" component={PaymentScreen} />
			<StackNavigator.Screen name="PaymentSuccess" component={OrderSuccessScreen} />
			<StackNavigator.Screen name="PaymentFailure" component={OrderFailScreen} />
		</StackNavigator.Navigator>
	);
};

export default PaymentScreenNavigator;
