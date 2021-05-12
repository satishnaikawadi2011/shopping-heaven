import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useThemeStore } from '../store/theme';
import { useAuthStore } from '../store/auth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { CustomDarkTheme, CustomDefaultTheme } from '../theme/theme';
import OfflineNotice from '../components/UI/OfflineNotice';

const AppNavigationContainer = () => {
	const { isDarkTheme } = useThemeStore();
	const { user,expiryDate } = useAuthStore();
	const theme =
		isDarkTheme ? CustomDarkTheme :
			CustomDefaultTheme;
	const isTokenExpired = expiryDate?.getTime() === new Date().getTime()
	return (
		<React.Fragment>
			<OfflineNotice/>
			<NavigationContainer theme={theme}>
			{
				user && !isTokenExpired ? <AppNavigator /> :
				<AuthNavigator />}
		</NavigationContainer>
		</React.Fragment>
	);
};

export default AppNavigationContainer;
