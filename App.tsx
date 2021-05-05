import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme/theme';
import { NavigationContainer } from '@react-navigation/native';
import { getCartDataFromAsyncStorage, useCartStore } from './src/store/cart';
import AuthNavigator from './src/navigation/AuthNavigator';
import { getUserDataFromAsyncStorage, useAuthStore } from './src/store/auth';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
	// https://eshopadminapp.netlify.app/
	const { setCartItems } = useCartStore();
	const { user, setExpiryDate, setUser, setToken } = useAuthStore();
	let cartData: any;
	let userData: any;
	useEffect(() => {
		const getCartData = async () => {
			cartData = await getCartDataFromAsyncStorage();
			if (cartData) {
				setCartItems(cartData.cartItems);
			}
		};
		const getUserData = async () => {
			userData = await getUserDataFromAsyncStorage();
			if (userData) {
				setExpiryDate(userData.tokenData.expiryDate);
				setUser(userData.user);
				setToken(userData.tokenData.token);
			}
		};
		getCartData();
		getUserData();
	}, []);
	const [
		loaded
	] = useFonts({
		UbuntuRegular: require('./assets/fonts/Ubuntu-Regular.ttf'),
		UbuntuLight: require('./assets/fonts/Ubuntu-Light.ttf'),
		UbuntuMedium: require('./assets/fonts/Ubuntu-Medium.ttf'),
		UbuntuBold: require('./assets/fonts/Ubuntu-Bold.ttf')
	});
	if (!loaded) {
		return null;
	}
	return (
		<PaperProvider theme={theme}>
			{/* <View style={centered}>
				<AppIcon name="email" bgColor={Colors.primary} />
			</View> */}
			{/* <ProfileScreen /> */}
			<NavigationContainer>
				{/* <ProductsNavigator /> */}
				{
					user ? <AppNavigator /> :
					<AuthNavigator />}
			</NavigationContainer>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container:
		{
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center'
		}
});
