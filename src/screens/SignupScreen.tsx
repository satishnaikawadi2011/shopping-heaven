import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Screen from '../components/Screen';
import { Colors } from '../../constants/colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppButton from '../components/UI/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
	navigation: RegisterScreenNavigationProp;
}

const SignupScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
	const initialValues = {
		email: '',
		password: '',
		username: ''
	};
	const authSchema = Yup.object({
		email: Yup.string().required().email(),
		password: Yup.string().required().min(6).max(12),
		username: Yup.string().required().min(4).max(16)
	});
	const submitHandler = async (values: any, actions: any) => {
		// try {
		console.log(values);
		console.log(actions);
		// 	await dispatch(loginUser(values));
		// } catch (err) {
		// 	console.log(errors);
		// 	console.log(err);
		// }
		actions.resetForm();
	};
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
								label="Email"
								left={<TextInput.Icon name="email" />}
								value={props.values.email}
								keyboardType="email-address"
								onChangeText={props.handleChange('email')}
								placeholder="Enter your email ..."
								onBlur={props.handleBlur('email')}
								underlineColor={Colors.primary}
								selectionColor={Colors.primary}
								error={

										props.touched.email && props.errors.email ? true :
										false
								}
							/>
							{props.errors.email &&
							props.touched.email && (
								<HelperText
									style={{ textAlign: 'center' }}
									type="error"
									visible={

											props.touched.email && props.errors.email ? true :
											false
									}
								>
									{props.errors.email}
								</HelperText>
							)}
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
								title="sign up"
								// loading={loading}
								onPress={// !loading ? props.handleSubmit :
								() => {}}
							/>
							<AppButton
								bgColor={Colors.accent}
								title="login here"
								onPress={() => {
									navigation.navigate('Login');
								}}
							/>
						</View>
					)}
				</Formik>
			</View>
		</View>
	);
};

export default SignupScreen;

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
