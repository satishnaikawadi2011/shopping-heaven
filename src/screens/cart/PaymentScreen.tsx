import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BACKEND_URL, DEVICE_WIDTH, INDIAN_RUPEE_SIGN, PUBLISHABLE_STRIPE_KEY } from '../../../constants';
import AppErrorMessage from '../../components/UI/form/AppErrorMessage';
import { Colors as MuiColors, RadioButton, Text, Title, Surface, Button, useTheme } from 'react-native-paper';
import { CreditCardInput } from 'react-native-credit-card-input';
import AppButton from '../../components/UI/app/Button';
import { createTokenRequest, CreditCard, payRequest } from '../../services/checkout';
import { PaymentMethodType } from '../../utils/types';
import CartDetails from '../../components/UI/cart/CartDetails';
import { useCartStore } from '../../store/cart';
import { Colors } from '../../../constants/colors';
import AuthenticProductsIcon from '../../icons/AuthenticProductsIcon';
import SecurePaymentIcon from '../../icons/SecurePaymentIcon';
import EasyReturnsIcon from '../../icons/EasyReturnsIcon';
import axios from 'axios';
import { useAddressStore } from '../../store/address';

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

const PaymentScreen = () => {
	const theme = useTheme();
	const { totalAmount, itemCount, cartItems } = useCartStore();
	const { preferredAddress } = useAddressStore()
	const [
		paymentType,
		setPaymentType
	] = useState<PaymentMethodType>('CreditCard');
	const [
		cardDetails,
		setCardDetails
	] = useState<CardDetails>(initialValues);
	const [
		error,
		setError
	] = useState<string>('Please fill up all card details correctly!!');
	const [
		loading,
		setLoading
	] = useState(false);
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
	const handlePlaceOrderForCreditCard = async () => {
		console.log('Handling');
		const expiry = cardDetails.expiry.split('/');
		const card: CreditCard = {
			number: cardDetails.number,
			cvc: cardDetails.cvc,
			name: cardDetails.name,
			exp_month: expiry[0],
			exp_year: expiry[1]
		};
		// console.log(card);
		setLoading(true);
		const {data:order} = await axios.post(`${BACKEND_URL}/order/add`, {
			orderItems: cartItems.map(crtItm => {
				return {
					title: crtItm.title,
					image: crtItm.image,
					price: crtItm.price,
					qty: crtItm.quantity,
					productId:crtItm._id
				}
			}),
			address: {
				fullName: preferredAddress?.fullName,
				phoneNumber: preferredAddress?.phoneNumber,
				pincode: preferredAddress?.pincode,
				state: preferredAddress?.state,
				country: preferredAddress?.country,
				road: preferredAddress?.road,
				building: preferredAddress?.building,
				city: preferredAddress?.city
			},
			itemsPrice:totalAmount(),
			shippingPrice:0,
			taxPrice:0,
			totalPrice:totalAmount(),
			paymentMethod:'CreditCard',
		}, { onUploadProgress: (progress: ProgressEvent) => console.log(progress.loaded / progress.total * 100) })
		console.log(order)
		try {
		const info = await createTokenRequest(card);
		const { data } = await payRequest(info.id, card.name, totalAmount(),order._id, (progress) => console.log(progress));
		} catch (error) {
			console.log(error)
			await axios.delete(`${BACKEND_URL}/order/${order._id}`)
		}
		setLoading(false);
	};
	const handlePlaceOrderForCOD = () => {};
	return (
		<View style={styles.container}>
			<ScrollView>
				<CartDetails title="Order Details" totalAmount={totalAmount()} totalItems={itemCount()} />
				<View style={styles.radioContainer}>
					<Title style={styles.title}>Select Payment Method</Title>
					<RadioButton.Group onValueChange={(newValue: any) => setPaymentType(newValue)} value={paymentType}>
						<View style={styles.row}>
							<RadioButton value="CreditCard" />
							<Text>Credit Card</Text>
						</View>
						<View style={styles.row}>
							<RadioButton value="COD" />
							<Text>Cash On Delivery</Text>
						</View>
					</RadioButton.Group>
				</View>
				{paymentType === 'CreditCard' && (
					<React.Fragment>
						<CreditCardInput
							validColor={MuiColors.green500}
							onChange={handleChange}
							requiresName
							labelStyle={{
								color:

										theme.dark ? '#ffffff' :
										'#000000'
							}}
							inputStyle={{
								color:

										theme.dark ? '#ffffff' :
										'#000000'
							}}
							inputContainerStyle={styles.inputContainerStyle}
						/>
						<AppErrorMessage style={{ alignSelf: 'center' }} errorMessage={error} visible={error !== ''} />
					</React.Fragment>
				)}
				<Surface
					style={[
						styles.surface,
						styles.row,
						{ justifyContent: 'space-between', marginVertical: 20 }
					]}
				>
					<View style={styles.iconContainer}>
						<AuthenticProductsIcon style={styles.icon} height={50} width={50} />
						<Text style={styles.icon}>Authenticated Products</Text>
					</View>
					<View style={styles.iconContainer}>
						<SecurePaymentIcon style={styles.icon} height={50} width={50} />
						<Text style={styles.icon}>Secure Payments</Text>
					</View>
					<View style={styles.iconContainer}>
						<EasyReturnsIcon style={styles.icon} height={50} width={50} />
						<Text style={styles.icon}>Easy Returns</Text>
					</View>
				</Surface>
			</ScrollView>
			{cartItems.length > 0 && (
				<Surface style={styles.surface}>
					<View style={styles.totalAmount}>
						<Title>
							{INDIAN_RUPEE_SIGN}
							{totalAmount()}
						</Title>
						{/* <Pressable onPress={handleViewCartDetails}>
								<Text style={{ color: Colors.primary, fontWeight: 'bold' }}>View price details</Text>
							</Pressable> */}
					</View>
					<Button
						disabled={(error !== '' && paymentType === 'CreditCard') || loading}
						mode="contained"
						onPress={

								paymentType === 'COD' ? handlePlaceOrderForCOD :
								handlePlaceOrderForCreditCard
						}
						style={{ alignSelf: 'center' }}
						color={Colors.accent}
					>
						{
							paymentType === 'COD' ? 'place order' :
							'pay'}
					</Button>
				</Surface>
			)}
		</View>
	);
};

export default PaymentScreen;

const styles = StyleSheet.create({
	icon:
		{
			alignSelf: 'center',
			textAlign: 'center'
		},
	container:
		{
			flex: 1
		},
	inputContainerStyle:
		{
			width: DEVICE_WIDTH * 0.9,
			alignSelf: 'center'
		},
	radioContainer:
		{
			padding: 10,
			marginVertical: 20
		},
	row:
		{
			flexDirection: 'row',
			alignItems: 'center'
		},
	title:
		{
			alignSelf: 'center',
			fontSize: 25,
			marginVertical: 20
		},
	surface:
		{
			width: DEVICE_WIDTH,
			flexDirection: 'row',
			justifyContent: 'space-between',
			padding: 10,
			marginBottom: 5,
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 2
				},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,

			elevation: 5
		},
	totalAmount: {},
	iconContainer:
		{
			width: 100
		}
});
