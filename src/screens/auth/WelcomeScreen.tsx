import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import AppButton from '../../components/UI/Button';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
	navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
	return (
		<ImageBackground blurRadius={1} source={require('../../../assets/background.jpg')} style={styles.background}>
			<Image source={require('../../../assets/logo.png')} style={styles.logo} />
			<View style={styles.buttonsContainer}>
				<AppButton
					title="login"
					onPress={() => {
						navigation.navigate('Login');
					}}
				/>
				<AppButton
					title="register"
					bgColor={Colors.accent}
					onPress={() => {
						navigation.navigate('Register');
					}}
				/>
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
