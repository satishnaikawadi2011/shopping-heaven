import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Provider as PaperProvider, Subheading, Text, Title } from 'react-native-paper';
import { Colors } from './constants/colors';
import AppButton from './src/components/UI/Button';
import ProductCard from './src/components/UI/ProductCard';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { theme } from './src/theme/theme';

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
			<ProductDetailScreen />
			{/* <WelcomeScreen /> */}
			{/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<AppButton title="Login" onPress={() => console.log('Pressed')} />
			</View> */}
			{/* <View style={{ padding: 20, paddingTop: 120, backgroundColor: '#f8f4f4' }}>
				<ProductCard
					coverUri="https://cdn.pixabay.com/photo/2014/12/03/06/31/showroom-555113__340.jpg"
					price={200}
					title={'Pollo Material'}
				/>
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
