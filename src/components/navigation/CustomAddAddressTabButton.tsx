import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	onPress?: () => void;
}

const CustomAddAddressTabButton: React.FC<Props> = ({ onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<MaterialCommunityIcons name="plus-circle" size={40} color={Colors.white} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CustomAddAddressTabButton;

const styles = StyleSheet.create({
	container:
		{
			backgroundColor: Colors.primary,
			height: 80,
			width: 80,
			borderRadius: 40,
			bottom: 30,
			borderColor: Colors.white,
			borderWidth: 10,
			alignItems: 'center',
			justifyContent: 'center'
		}
});
