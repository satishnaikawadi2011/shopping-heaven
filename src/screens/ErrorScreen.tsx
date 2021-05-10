import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Colors as MuiColors } from 'react-native-paper';
import AppIcon from '../components/UI/app/AppIcon';

interface ErrorScreenProps {
	errorMessage: string;
	icon: any;
	ButtonComponent?: any;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ errorMessage, icon, ButtonComponent }) => {
	return (
		<View style={styles.container}>
			<AppIcon name={icon} bgColor={MuiColors.red500} iconColor={MuiColors.white} size={150} />
			<Text style={styles.errorMessage}>{errorMessage}</Text>
			{ButtonComponent}
		</View>
	);
};

export default ErrorScreen;

const styles = StyleSheet.create({
	container:
		{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
	errorMessage:
		{
			fontWeight: 'bold',
			fontSize: 20,
			marginVertical: 10
		}
});
