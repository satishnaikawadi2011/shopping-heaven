import React from 'react';
import { TextInputProps, ViewStyle, StyleSheet, View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../../../constants/colors';

interface InputProps {
	style?: ViewStyle;
	icon?: any;
}

const AppTextInput: React.FC<TextInputProps & InputProps> = ({ style, icon, ...props }) => {
	const theme = useTheme();
	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: theme.colors.background },
				style
			]}
		>
			{icon && <MaterialCommunityIcons style={styles.icon} color={Colors.medium} name={icon} size={20} />}
			<TextInput style={styles.textInput} {...props} />
		</View>
	);
};

export default AppTextInput;

const styles = StyleSheet.create({
	container:
		{
			borderRadius: 25,
			flexDirection: 'row',
			width: '95%',
			padding: 15,
			alignSelf: 'center',
			marginVertical: 10,
			alignItems: 'center'
		},
	icon:
		{
			marginHorizontal: 10
		},
	textInput:
		{
			fontFamily: 'UbuntuRegular',
			fontSize: 18
		}
});
