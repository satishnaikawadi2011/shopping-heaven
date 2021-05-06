import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface ErrorMessageProps {
	errorMessage: string;
	style?: TextStyle;
	visible: boolean;
}

const AppErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage, style, visible }) => {
	if (!visible) {
		return null;
	}
	return (
		<Text
			style={[
				styles.error,
				style
			]}
		>
			{errorMessage}
		</Text>
	);
};

export default AppErrorMessage;

const styles = StyleSheet.create({
	error:
		{
			color: 'red'
		}
});
