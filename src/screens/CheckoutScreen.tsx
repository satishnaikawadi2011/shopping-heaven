import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DEVICE_WIDTH } from '../../constants';
import AppErrorMessage from '../components/UI/form/AppErrorMessage';
import { Colors as MuiColors } from 'react-native-paper';
import { CreditCardInput } from 'react-native-credit-card-input';
import AppButton from '../components/UI/app/Button';

interface CardDetails {
	cvc: string;
	expiry: string;
	name: string;
	number: string;
}

const initialValues = {
	cvc: '',
	expiry: '',
	name: '',
	number: ''
};

const CheckoutScreen = () => {
	const [
		cardDetails,
		setCardDetails
	] = useState<CardDetails>(initialValues);
	const [
		error,
		setError
	] = useState<string>('Please fill up all card details correctly!!');
	const handleChange = (form: any) => {
		setError('');
		if (Object.values(form.status).includes('incomplete')) {
			setError('Please fill up all card details correctly!!');
			return;
		}
		setCardDetails({
			cvc: form.values.cvc,
			name: form.values.name,
			number: form.values.number,
			expiry: form.values.expiry
		});
	};
	return (
		<View style={styles.container}>
			<CreditCardInput
				validColor={MuiColors.green500}
				onChange={handleChange}
				requiresName
				inputContainerStyle={styles.inputContainerStyle}
			/>
			<AppErrorMessage style={{ alignSelf: 'center' }} errorMessage={error} visible={error !== ''} />
			<AppButton disabled={error !== ''} title="Checkout" onPress={() => console.log(cardDetails)} />
		</View>
	);
};

export default CheckoutScreen;

const styles = StyleSheet.create({
	container: {},
	inputContainerStyle:
		{
			width: DEVICE_WIDTH * 0.9,
			alignSelf: 'center'
		}
});
