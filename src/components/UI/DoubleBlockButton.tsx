import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ButtonProps {
	bgColor?: string;
	labelColor?: string;
	icon?: any;
	onPress?: () => void;
	label: string;
}

interface DoubleBlockButtonProps {
	rightButtonProps: ButtonProps;
	leftButtonProps: ButtonProps;
}

const DoubleBlockButton: React.FC<DoubleBlockButtonProps> = ({ rightButtonProps, leftButtonProps }) => {
	const { label, bgColor, icon, labelColor, onPress } = leftButtonProps;
	const {
		label: rightLabel,
		icon: rightIcon,
		bgColor: rightBgColor,
		labelColor: rightLabelColor,
		onPress: rightOnPress
	} = rightButtonProps;
	return (
		<View style={styles.btnContiner}>
			<TouchableWithoutFeedback onPress={onPress}>
				<View
					style={[
						styles.button,
						styles.row,
						{
							backgroundColor:

									bgColor ? bgColor :
									Colors.primary
						}
					]}
				>
					{icon && (
						<MaterialCommunityIcons
							size={20}
							style={styles.icon}
							color={

									labelColor ? labelColor :
									Colors.black
							}
							name={icon}
						/>
					)}
					<Text
						style={[
							styles.label,
							{
								color:

										labelColor ? labelColor :
										Colors.black
							}
						]}
					>
						{label}
					</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={rightOnPress}>
				<View
					style={[
						styles.button,
						styles.row,
						{
							backgroundColor:

									rightBgColor ? rightBgColor :
									Colors.accent
						}
					]}
				>
					{rightIcon && (
						<MaterialCommunityIcons
							size={20}
							color={

									rightLabelColor ? rightLabelColor :
									Colors.black
							}
							style={styles.icon}
							name={rightIcon}
						/>
					)}
					<Text
						style={[
							styles.label,
							{
								color:

										rightLabelColor ? rightLabelColor :
										Colors.black
							}
						]}
					>
						{rightLabel}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default DoubleBlockButton;

const styles = StyleSheet.create({
	btnContiner:
		{
			width: '100%',
			flexDirection: 'row'
		},
	button:
		{
			padding: 15,
			alignSelf: 'center',
			width: '50%',
			justifyContent: 'center',
			alignItems: 'center'
		},
	label:
		{
			textTransform: 'uppercase',
			fontWeight: 'bold',
			fontFamily: 'UbuntuBold',
			fontSize: 15
		},
	icon:
		{
			marginHorizontal: 10
		},
	row:
		{
			flexDirection: 'row'
		}
});
