import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text } from 'react-native-paper';
import { useCartStore } from '../store/cart';

interface Props {}

const OrderSuccessScreen: React.FC<Props> = ({}) => {
	const { clearCart } = useCartStore();
	const navigation = useNavigation();
	const theme = useTheme();
	useEffect(() => {
		clearCart();
	}, []);
	const [
		isAnimationCompleted,
		setIsAnimationCompleted
	] = useState(false);
	if (isAnimationCompleted) {
		return (
			<View style={styles.container}>
				<MaterialCommunityIcons name="checkbox-marked-circle" color={'green'} size={150} />
				<Text style={styles.message}>Order placed successfully</Text>
				<Button mode="contained" onPress={() => navigation.navigate('Home')}>
					Go Back
				</Button>
			</View>
		);
	}
	return (
		<LottieView
			source={require('../../assets/animations/order-placed.json')}
			autoPlay
			loop={false}
			onAnimationFinish={() => setIsAnimationCompleted(true)}
			style={{ backgroundColor: theme.colors.background }}
		/>
	);
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
	container:
		{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
	message:
		{
			fontWeight: 'bold',
			fontSize: 20,
			marginVertical: 10
		}
});
