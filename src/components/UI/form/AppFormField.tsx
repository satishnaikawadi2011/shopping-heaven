import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import AppTextInput from '../app/AppTextInput';
import AppErrorMessage from './AppErrorMessage';
import { InputProps } from '../app/AppTextInput';

interface FormFieldProps {
	name: string;
	small?: boolean;
}

const AppFormField: React.FC<FormFieldProps & TextInputProps & InputProps> = ({ name, small, ...props }) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;
	return (
		<View style={{ width: '100%' }}>
			<AppTextInput
				onChangeText={(text) => setFieldValue(name, text)}
				value={myValues[name]}
				onBlur={() => setFieldTouched(name)}
				{...props}
			/>
			<AppErrorMessage
				style={{
					marginLeft: 20,
					width:

							small ? '45%' :
							'100%',
					alignSelf: 'center'
				}}
				errorMessage={formErrors[name]}
				visible={formTouched[name]}
			/>
		</View>
	);
};

export default AppFormField;

const styles = StyleSheet.create({});
