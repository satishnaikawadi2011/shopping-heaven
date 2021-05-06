import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import AppTextInput from '../app/AppTextInput';
import AppErrorMessage from './AppErrorMessage';
import { InputProps } from '../app/AppTextInput';

interface FormFieldProps {
	name: string;
}

const AppFormField: React.FC<FormFieldProps & TextInputProps & InputProps> = ({ name, ...props }) => {
	const { errors, touched, setFieldTouched, handleChange } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	return (
		<React.Fragment>
			<AppTextInput onChangeText={handleChange(name)} onBlur={() => setFieldTouched(name)} {...props} />
			<AppErrorMessage errorMessage={formErrors[name]} visible={formTouched[name]} />
		</React.Fragment>
	);
};

export default AppFormField;

const styles = StyleSheet.create({});
