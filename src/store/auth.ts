import { User } from './../models/User';
import create from 'zustand';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

let timer: any;

type AuthStore = {
	token: string | null;
	user: User | null;
	expiryDate: Date | null;
	loading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
	setLoading: (loading: boolean) => void;
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	setExpiryDate: (expiryDate: Date | null) => void;
	login: (username: string, password: string) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	expiryDate: null,
	user: null,
	loading: false,
	error: null,
	setError: (error) => set((state) => ({ ...state, error })),
	setLoading: (loading) => set((state) => ({ ...state, loading })),
	setToken: (token) => set((state) => ({ ...state, token })),
	setUser: (user) => set((state) => ({ ...state, user })),
	setExpiryDate: (expiryDate) => set((state) => ({ ...state, expiryDate })),
	login:
		async (username: string, password: string) => {
			try {
				get().setLoading(true);
				// console.log('Before');
				const res = await axios.post(`${BACKEND_URL}/user/login`, { username, password });
				// console.log('After', res);
				get().setLoading(false);
				const decodedToken: any = jwtDecode(res.data.token);
				const expiryDate = new Date(decodedToken.exp * 1000);
				set((state) => ({ ...state, user: res.data.user, token: res.data.token, expiryDate: expiryDate }));
				saveToAsyncStorage(res.data.user, expiryDate, res.data.token);
			} catch (error) {
				get().setLoading(false);
				get().setError(

						error.response ? error.response.data.message :
						'Something went wrong !'
				);
			}
		}
}));

const setLogoutTimer = (expirationTime: number) => {
	// timer = setTimeout(() => {
	// 	dispatch(logout());
	// }, expirationTime);
};

export const logoutUser = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('user');
	AsyncStorage.removeItem('tokenData');
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const saveToAsyncStorage = (user: User, expiryDate: Date, token: string) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	AsyncStorage.setItem('user', JSON.stringify(user));
	AsyncStorage.setItem(
		'tokenData',
		JSON.stringify({
			token,
			expiryDate: expiryDate.toISOString()
		})
	);
};

export const removeFromAsyncStorage = () => {
	AsyncStorage.removeItem('user');
	AsyncStorage.removeItem('tokenData');
};

export const getUserDataFromAsyncStorage = async () => {
	try {
		const tokenData: any = await AsyncStorage.getItem('tokenData');
		const user: any = await AsyncStorage.getItem('user');
		if (user && tokenData) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(tokenData).token}`;

			return {
				tokenData: JSON.parse(tokenData),
				user: JSON.parse(user)
			};
		}
		return null;
	} catch (error) {
		console.log(error);
	}
};
