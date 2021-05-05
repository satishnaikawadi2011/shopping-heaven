import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	Provider as PaperProvider,
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { useThemeStore } from '../store/theme';
import { useAuthStore } from '../store/auth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

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

const AppNavigationContainer = () => {
	const { isDarkTheme } = useThemeStore();
	const { user } = useAuthStore();
	const theme =
		isDarkTheme ? CustomDarkTheme :
		CustomDefaultTheme;
	return (
		<NavigationContainer theme={theme}>
			{
				user ? <AppNavigator /> :
				<AuthNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigationContainer;
