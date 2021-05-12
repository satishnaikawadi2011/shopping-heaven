import { getAddressDataFromAsyncStorage } from '../store/address';
import { getUserDataFromAsyncStorage } from '../store/auth';
import { getCartDataFromAsyncStorage } from '../store/cart';
import { getFavouritesDataFromAsyncStorage } from '../store/favourites';
import { getThemeDataFromAsyncStorage } from '../store/theme';
import client from '../api/client';

const getDataFromAsyncStorageOnStart = (
	setCartItems: Function,
	setExpiryDate: Function,
	setUser: Function,
	setToken: Function,
	setIsDarkTheme: Function,
	setProducts: Function,
	setProductIds: Function,
	setAddresses: Function,
	setPreferredAddress: Function
) => {
	const getCartData = async () => {
		const cartData = await getCartDataFromAsyncStorage();
		if (cartData) {
			setCartItems(cartData.cartItems);
		}
	};
	const getUserData = async () => {
		const userData = await getUserDataFromAsyncStorage();
		if (userData) {
			console.log('Getting data');
			setExpiryDate(new Date(userData.tokenData.expiryDate));
			setUser(userData.user);
			setToken(userData.tokenData.token);
			client.setHeader('Authorization', `Bearer ${userData.tokenData.token}`);
		}
	};
	const getThemeData = async () => {
		const themeData = await getThemeDataFromAsyncStorage();
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
	return new Promise<void>((resolve, reject) => {
		resolve();
	});
};

export default getDataFromAsyncStorageOnStart;
