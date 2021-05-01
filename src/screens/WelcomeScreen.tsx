import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';
import AppButton from '../components/UI/Button';

const WelcomeScreen = () => {
	return (
		<ImageBackground blurRadius={1} source={require('../../assets/background.jpg')} style={styles.background}>
			<Image source={require('../../assets/logo.png')} style={styles.logo} />
			<View style={styles.buttonsContainer}>
				<AppButton title="login" />
				<AppButton title="register" bgColor={Colors.accent} />
			</View>
		</ImageBackground>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	background:
		{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-end'
		},
	buttonsContainer:
		{
			width: '100%',
			padding: 20
		},
	logo:
		{
			width: 200,
			height: 200,
			position: 'absolute',
			top: 50
		}
});
