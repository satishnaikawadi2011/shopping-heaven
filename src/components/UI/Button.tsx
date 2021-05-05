import React from 'react';
import { GestureResponderEvent, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../../../constants/colors';
import { ActivityIndicator, Text } from 'react-native-paper';

interface ButtonProps {
	title: string;
	bgColor?: string;
	titleColor?: string;
	loading?: boolean;
	onPress?: () => void;
}

const AppButton: React.FC<ButtonProps> = ({
	title,
	bgColor = Colors.primary,
	titleColor = Colors.white,
	loading = false,
	onPress = () => {}
}) => {
	return (
		<Pressable onPress={onPress} style={{ ...styles.button, backgroundColor: bgColor }}>
			{
				loading ? <ActivityIndicator size="small" color={Colors.white} /> :
				<Text style={{ ...styles.text, color: titleColor }}>{title}</Text>}
		</Pressable>
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
			fontSize: 18,
			textTransform: 'uppercase',
			fontWeight: 'bold'
		}
});
