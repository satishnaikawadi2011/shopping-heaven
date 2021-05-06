import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface ErrorMessageProps {
	errorMessage: string;
}

const AppErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
	return <Text style={styles.error}>{errorMessage}</Text>;
};

export default AppErrorMessage;

const styles = StyleSheet.create({
	error:
		{
			color: 'red'
		}
});
