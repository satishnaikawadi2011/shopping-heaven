import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DEVICE_WIDTH, INDIAN_RUPEE_SIGN } from '../../../constants';
import AppErrorMessage from '../../components/UI/form/AppErrorMessage';
import { Colors as MuiColors, RadioButton, Text, Title, Surface, Button, useTheme } from 'react-native-paper';
import { CreditCardInput } from 'react-native-credit-card-input';
import checkoutService, { CreditCard } from '../../services/checkout';
import { PaymentMethodType } from '../../utils/types';
import CartDetails from '../../components/UI/cart/CartDetails';
import { useCartStore } from '../../store/cart';
import { Colors } from '../../../constants/colors';
import AuthenticProductsIcon from '../../icons/AuthenticProductsIcon';
import SecurePaymentIcon from '../../icons/SecurePaymentIcon';
import EasyReturnsIcon from '../../icons/EasyReturnsIcon';
import { useAddressStore } from '../../store/address';
import ordersApi from '../../api/orders';
import ErrorScreen from '../ErrorScreen';
import { PaymentStackNavProps } from '../../navigation/payment/PaymentScreenNavigator';
import AppActivityIndicator from '../../animations/AppActivityIndicator';

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

const PaymentScreen = ({ navigation }: PaymentStackNavProps<'PaymentHome'>) => {
	const theme = useTheme();
	const { totalAmount, itemCount, cartItems, clearCart } = useCartStore();
	const { preferredAddress } = useAddressStore();
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
		const expiry = cardDetails.expiry.split('/');
		const card: CreditCard = {
			number: cardDetails.number,
			cvc: cardDetails.cvc,
			name: cardDetails.name,
			exp_month: expiry[0],
			exp_year: expiry[1]
		};
		setLoading(true);
		const orderRes = await ordersApi.addOrder(
			cartItems,
			preferredAddress as any,
			totalAmount(),
			totalAmount(),
			0,
			0,
			paymentType
		);
		if (!orderRes.ok) {
			setLoading(false);
			navigation.navigate('PaymentFailure');
			return;
		}
		try {
			const addOrderData = orderRes.data as any;
			const info = await checkoutService.createTokenRequest(card);
			await checkoutService.payRequest(info.id, card.name, totalAmount(), addOrderData._id);
			setLoading(false);
			navigation.navigate('PaymentSuccess');
		} catch (error) {
			navigation.navigate('PaymentFailure');
			const addOrderData = orderRes.data as any;
			console.log(error);
			ordersApi.deleteOrder(addOrderData._id);
		}
		setLoading(false);
	};
	const handlePlaceOrderForCOD = async () => {
		setLoading(true);
		const orderRes = await ordersApi.addOrder(
			cartItems,
			preferredAddress as any,
			totalAmount(),
			totalAmount(),
			0,
			0,
			paymentType
		);
		if (!orderRes.ok) {
			setLoading(false);
			navigation.navigate('PaymentFailure');
			return;
		}
		setLoading(false);
		navigation.navigate('PaymentSuccess');
	};
	if (loading) {
		return <AppActivityIndicator visible={true} />;
	}
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
