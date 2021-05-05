import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeStore = {
	isDarkTheme: boolean;
	setIsDarkTheme: (value: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
	isDarkTheme: false,
	setIsDarkTheme:
		(value) => {
			set((state) => ({ ...state, isDarkTheme: value }));
			saveThemeDataToAsyncStorage(get().isDarkTheme);
		}
}));

const saveThemeDataToAsyncStorage = (isDarkTheme: boolean) => {
	AsyncStorage.setItem('themeData', JSON.stringify({ isDarkTheme }));
};

export const getThemeDataFromAsyncStorage = async () => {
	const themeData: any = await AsyncStorage.getItem('themeData');
	if (themeData) {
		return JSON.parse(themeData);
	}
	return null;
};
