import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCartDataFromAsyncStorage, useCartStore } from './src/store/cart';
import { getUserDataFromAsyncStorage, useAuthStore } from './src/store/auth';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import {
	Provider as PaperProvider,
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { useThemeStore } from './src/store/theme';

const CustomDefaultTheme = {
	...NavigationDefaultTheme,
	...PaperDefaultTheme,
	colors:
		{
			...NavigationDefaultTheme.colors,
			...PaperDefaultTheme.colors,
			primary: '#73e2a7',
			accent: '#b1cf5f'
		}
};

const CustomDarkTheme = {
	...NavigationDarkTheme,
	...PaperDarkTheme,
	colors:
		{
			...NavigationDarkTheme.colors,
			...PaperDarkTheme.colors,
			primary: '#73e2a7',
			accent: '#b1cf5f'
		}
};

export default function App() {
	// https://eshopadminapp.netlify.app/
	const { isDarkTheme } = useThemeStore();
	const theme =
		isDarkTheme ? CustomDarkTheme :
		CustomDefaultTheme;
	const { setCartItems } = useCartStore();
	const { setExpiryDate, setUser, setToken } = useAuthStore();
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
			<AppNavigationContainer />
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
