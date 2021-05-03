import React from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Screen from '../components/Screen';
import { Colors } from '../../constants/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../components/UI/Button';
import { useAuthStore } from '../store/auth';

const LoginScreen = () => {
	const { loading, login, error, setError } = useAuthStore();
	const initialValues = {
		username: '',
		password: ''
	};
	const authSchema = Yup.object({
		username: Yup.string().required().min(4).max(16),
		password: Yup.string().required().min(6).max(12)
	});
	const submitHandler = async (values: any, actions: any) => {
		await login(values.username, values.password);
		actions.resetForm();
	};
	if (error) {
		Alert.alert('Error', error, [
			{ text: 'Ok', style: 'cancel' }
		]);
		setError(null);
	}
	return (
		<View style={{ flex: 1, justifyContent: 'space-evenly' }}>
			<Image style={styles.logo} source={require('../../assets/logo.png')} />
			<View style={styles.container}>
				<Formik validationSchema={authSchema} initialValues={initialValues} onSubmit={submitHandler}>
					{(props) => (
						<View style={styles.form}>
							<TextInput
								mode="outlined"
								style={styles.input}
								label="Username"
								left={<TextInput.Icon name="account-circle" />}
								value={props.values.username}
								keyboardType="default"
								onChangeText={props.handleChange('username')}
								placeholder="Enter your username ..."
								onBlur={props.handleBlur('username')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.username && props.errors.username ? true :
										false
								}
							/>
							{props.errors.username &&
							props.touched.username && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.username && props.errors.username ? true :
											false
									}
								>
									{props.errors.username}
								</HelperText>
							)}
							<TextInput
								mode="outlined"
								style={styles.input}
								label="Password"
								value={props.values.password}
								secureTextEntry
								left={<TextInput.Icon name="key-variant" />}
								onChangeText={props.handleChange('password')}
								placeholder="Enter your password ..."
								onBlur={props.handleBlur('password')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.password && props.errors.password ? true :
										false
								}
							/>
							{props.errors.password &&
							props.touched.password && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.password && props.errors.password ? true :
											false
									}
								>
									{props.errors.password}
								</HelperText>
							)}
							<AppButton
								loading={loading}
								title="sign in"
								onPress={

										!loading ? props.handleSubmit :
										() => {}
								}
							/>
							<AppButton
								bgColor={Colors.accent}
								title="register here"
								onPress={() => {
									// !loading ? navigation.navigate('Signup') :
									// null;
								}}
							/>
						</View>
					)}
				</Formik>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	logo:
		{
			width: 150,
			height: 150,
			alignSelf: 'center'
		},
	container:
		{
			alignItems: 'center'
		},
	input:
		{
			width: '90%',
			marginVertical: 10,
			marginLeft: 20
		},
	form:
		{
			width: '90%'
		}
});
