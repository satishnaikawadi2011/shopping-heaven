import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { useAuthStore } from './src/store/auth';
import { useCartStore } from './src/store/cart';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { useThemeStore } from './src/store/theme';
import { CustomDarkTheme, CustomDefaultTheme } from './src/theme/theme';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFavouritesStore } from './src/store/favourites';
import { useAddressStore } from './src/store/address';
import getDataFromAsyncStorageOnStart from './src/utils/getDataFromAsyncStorageOnStart';

export default function App() {
	const [
		isReady,
		setIsReady
	] = useState(false);
	const { setProductIds: g, setProducts: f } = useFavouritesStore();
	const { isDarkTheme, setIsDarkTheme: e } = useThemeStore();
	const { setAddresses: h, setPreferredAddress: i } = useAddressStore();
	const theme =
		isDarkTheme ? CustomDarkTheme :
		CustomDefaultTheme;
	const { setCartItems: a } = useCartStore();
	const { setExpiryDate: b, setUser: c, setToken: d } = useAuthStore();

	// async function prepare() {
	// 	try {
	// 		await SplashScreen.preventAutoHideAsync();
	// 		await getDataFromAsyncStorageOnStart(a, b, c, d, e, f, g, h, i);
	// 	} catch (e) {
	// 		console.warn(e);
	// 	} finally {
	// 		setIsReady(true);
	// 	}
	// }
	useEffect(
		() => {
			launch();
		},
		[
			isReady
		]
	);
	const launch = async () => {
		if (isReady) {
			// await SplashScreen.hideAsync();
			setTimeout(() => SplashScreen.hideAsync(), 2000);
		}
	};
	const [
		loaded
	] = useFonts({
		UbuntuRegular: require('./assets/fonts/Ubuntu-Regular.ttf'),
		UbuntuLight: require('./assets/fonts/Ubuntu-Light.ttf'),
		UbuntuMedium: require('./assets/fonts/Ubuntu-Medium.ttf'),
		UbuntuBold: require('./assets/fonts/Ubuntu-Bold.ttf')
	});
	if (!loaded || !isReady) {
		return (
			<AppLoading
				autoHideSplash={false}
				onError={(error) => console.log('Error from AppLoading', error)}
				startAsync={() => getDataFromAsyncStorageOnStart(a, b, c, d, e, f, g, h, i)}
				onFinish={() => setIsReady(true)}
			/>
		);
	}
	return (
		<PaperProvider theme={theme}>
			<AppNavigationContainer />
			{/* <View style={{ flex: 1, justifyContent: 'center' }}>
				<OrderItemCard />
			</View> */}
		</PaperProvider>
	);
}
