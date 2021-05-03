import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Provider as PaperProvider, Subheading, Text, Title } from 'react-native-paper';
import { Colors } from './constants/colors';
import AppButton from './src/components/UI/Button';
import ProductCard from './src/components/UI/ProductCard';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { theme } from './src/theme/theme';
import ProductListScreen from './src/screens/ProductListScreen';
import { ProductsNavigator } from './src/navigation/ProductStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import CartItemTile from './src/components/UI/CartItemTile';
import { centered } from './src/utils/commonStyles';
import CartDetails from './src/components/UI/CartDetails';

export default function App() {
	// https://eshopadminapp.netlify.app/
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
			{/* <View style={centered}>
				<CartDetails />
			</View> */}
			<NavigationContainer>
				<ProductsNavigator />
			</NavigationContainer>
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
