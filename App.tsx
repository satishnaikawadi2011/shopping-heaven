import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCartDataFromAsyncStorage, useCartStore } from './src/store/cart';
import { getUserDataFromAsyncStorage, useAuthStore } from './src/store/auth';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { getThemeDataFromAsyncStorage, useThemeStore } from './src/store/theme';
import { CustomDarkTheme, CustomDefaultTheme } from './src/theme/theme';
import { Provider as PaperProvider } from 'react-native-paper';
import AppTextInput from './src/components/UI/app/AppTextInput';
import { centered } from './src/utils/commonStyles';
import { getFavouritesDataFromAsyncStorage, useFavouritesStore } from './src/store/favourites';
import AddressItem from './src/components/UI/address/AddressItem';
import { getAddressDataFromAsyncStorage, useAddressStore } from './src/store/address';

export default function App() {
	// https://eshopadminapp.netlify.app/
	const { setProductIds, setProducts } = useFavouritesStore();
	const { isDarkTheme, setIsDarkTheme } = useThemeStore();
	const { setAddresses, setPreferredAddress } = useAddressStore();
	const theme =
		isDarkTheme ? CustomDarkTheme :
		CustomDefaultTheme;
	const { setCartItems } = useCartStore();
	const { setExpiryDate, setUser, setToken } = useAuthStore();
	let cartData: any;
	let userData: any;
	let themeData: any;
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
		const getThemeData = async () => {
			themeData = await getThemeDataFromAsyncStorage();
			if (themeData) {
				setIsDarkTheme(themeData.isDarkTheme);
			}
		};
		const getFavouritesData = async () => {
			const favouritesData = await getFavouritesDataFromAsyncStorage();
			if (favouritesData) {
				setProducts(favouritesData.favourites);
				setProductIds(favouritesData.ids);
			}
		};
		const getAddressData = async () => {
			const addressData = await getAddressDataFromAsyncStorage();
			if (addressData) {
				setAddresses(addressData.addresses);
				setPreferredAddress(addressData.addresses[0]);
			}
		};
		getFavouritesData();
		getCartData();
		getUserData();
		getThemeData();
		getFavouritesData();
		getAddressData();
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
			{/* <View style={centered}>
				<AddressItem />
			</View> */}
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
