import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../app/Button';

interface SubmitButtonProps {
	title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ title }) => {
	const { handleSubmit } = useFormikContext();
	return <AppButton title={title} onPress={handleSubmit} />;
};

export default SubmitButton;

const styles = StyleSheet.create({});
