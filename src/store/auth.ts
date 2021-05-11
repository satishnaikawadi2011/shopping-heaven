import { User } from './../models/User';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

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
	setExpiryDate: (expiryDate) => set((state) => ({ ...state, expiryDate }))
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

export const saveToAsyncStorage = (user: User, expiryDate: Date, token: string) => {
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
	client.setHeader('Authorization', '');
	AsyncStorage.removeItem('user');
	AsyncStorage.removeItem('tokenData');
};

export const getUserDataFromAsyncStorage = async () => {
	try {
		const tokenData: any = await AsyncStorage.getItem('tokenData');
		const user: any = await AsyncStorage.getItem('user');
		if (user && tokenData) {
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
