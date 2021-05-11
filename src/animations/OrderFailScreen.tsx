import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Button, Text } from 'react-native-paper';

interface Props {}

const OrderFailScreen: React.FC<Props> = ({}) => {
	const navigation = useNavigation();
	const theme = useTheme();
	const [
		isAnimationCompleted,
		setIsAnimationCompleted
	] = useState(false);
	if (isAnimationCompleted) {
		return (
			<View style={styles.container}>
				<Entypo name="circle-with-cross" color={'red'} size={150} />
				<Text style={styles.message}>Something went wrong,could not place your order.</Text>
				<Button mode="contained" onPress={() => navigation.navigate('Cart')}>
					Go To Cart
				</Button>
			</View>
		);
	}
	return (
		<LottieView
			source={require('../../assets/animations/failed.json')}
			autoPlay
			loop={false}
			onAnimationFinish={() => setIsAnimationCompleted(true)}
			style={{ backgroundColor: theme.colors.background }}
		/>
	);
};

export default OrderFailScreen;

const styles = StyleSheet.create({
	container:
		{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			marginHorizontal: 20
		},
	message:
		{
			fontWeight: 'bold',
			fontSize: 20,
			marginVertical: 10,
			textAlign: 'center'
		}
});
