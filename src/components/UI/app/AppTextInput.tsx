import React from 'react';
import { TextInputProps, ViewStyle, StyleSheet, View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { Colors } from '../../../../constants/colors';

export interface InputProps {
	style?: ViewStyle;
	icon?: any;
}

const AppTextInput: React.FC<TextInputProps & InputProps> = ({ style, icon, ...props }) => {
	const theme = useTheme();
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor:

							theme.dark ? Colors.darkTextInputBg :
							Colors.lightTextInputBg
				},
				style
			]}
		>
			{icon && (
				<MaterialCommunityIcons style={styles.icon} color={theme.colors.placeholder} name={icon} size={20} />
			)}
			<TextInput
				placeholderTextColor={theme.colors.placeholder}
				style={[
					styles.textInput,
					{ color: theme.colors.text }
				]}
				{...props}
			/>
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
			alignItems: 'center',
			overflow: 'hidden'
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
