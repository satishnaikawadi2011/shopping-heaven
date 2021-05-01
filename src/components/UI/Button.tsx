import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';

interface ButtonProps {
	title: string;
	bgColor?: string;
	titleColor?: string;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const AppButton: React.FC<ButtonProps> = ({
	title,
	bgColor = Colors.primary,
	titleColor = Colors.white,
	onPress = () => {}
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={{ ...styles.button, backgroundColor: bgColor }}>
			<Text style={{ ...styles.text, color: titleColor }}>{title}</Text>
		</TouchableOpacity>
	);
};

export default AppButton;

const styles = StyleSheet.create({
	button:
		{
			backgroundColor: Colors.primary,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 25,
			padding: 15,
			width: '100%',
			marginVertical: 10
		},
	text:
		{
			color: Colors.white,
			fontFamily: 'UbuntuRegular',
			fontSize: 18,
			textTransform: 'uppercase',
			fontWeight: 'bold'
		}
});
