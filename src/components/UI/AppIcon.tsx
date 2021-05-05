import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IconProps {
	name: any;
	size?: number;
	iconColor?: string;
	bgColor?: string;
}

const AppIcon: React.FC<IconProps> = ({ name, bgColor = Colors.black, iconColor = Colors.white, size = 40 }) => {
	return (
		<View
			style={{
				width: size,
				height: size,
				borderRadius: size / 2,
				backgroundColor: bgColor,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
		</View>
	);
};

export default AppIcon;

const styles = StyleSheet.create({});
