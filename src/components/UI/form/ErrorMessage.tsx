import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface ErrorMessageProps {
	errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
	return <Text style={styles.error}>{errorMessage}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
	error:
		{
			color: 'red'
		}
});
