import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useThemeStore } from '../store/theme';
import { useAuthStore } from '../store/auth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { CustomDarkTheme, CustomDefaultTheme } from '../theme/theme';

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
