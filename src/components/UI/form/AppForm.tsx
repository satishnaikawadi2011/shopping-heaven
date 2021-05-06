import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

interface AppFormProps {
	initialValues: any;
	validationSchema: any;
	onSubmit: any;
}

const AppForm: React.FC<AppFormProps> = ({ initialValues, onSubmit, validationSchema, children }) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{() => <React.Fragment>{children}</React.Fragment>}
		</Formik>
	);
};

export default AppForm;

const styles = StyleSheet.create({});
