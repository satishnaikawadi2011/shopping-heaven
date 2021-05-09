import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppForm from '../components/UI/form/AppForm';
import * as Yup from 'yup';
import AppFormField from '../components/UI/form/AppFormField';
import SubmitButton from '../components/UI/form/SubmitButton';
import { useAddressStore } from '../store/address';
import { RadioButton, Snackbar, Text, useTheme } from 'react-native-paper';
import useLocation from '../hooks/useLocation';
import { getAddressFromGeocode, getCurrentLocation } from '../utils/location';

const mannualAddressInitialValues = {
	fullName: '',
	phoneNumber: '',
	pincode: '',
	state: '',
	country: '',
	city: '',
	road: '',
	building: ''
};

const cuurentLocationAddressInitialValues = {
	fullName: '',
	phoneNumber: ''
};

const currentLocationAddressSchema = Yup.object({
	fullName: Yup.string().required(),
	phoneNumber: Yup.string().required().length(10)
});

const mannualAddressSchema = Yup.object({
	fullName: Yup.string().required(),
	phoneNumber: Yup.string().required().length(10),
	pincode: Yup.string().required().length(6),
	state: Yup.string().required(),
	country: Yup.string().required(),
	city: Yup.string().required(),
	road: Yup.string().required('This field is required.'),
	building: Yup.string().required('This field is required.')
});

const AddAddressScreen = (props: any) => {
	const theme = useTheme();
	const [
		error,
		setError
	] = useState<string | null>(null);
	const [
		loading,
		setLoading
	] = useState(false);
	const [
		addressType,
		setAddressType
	] = useState<'mannual' | 'location'>('mannual');
	const [
		snackbarVisible,
		setSnackbarVisible
	] = useState(false);
	const { addAddress } = useAddressStore();
	const handleMannualAddressSubmit = (values: any, actions: any) => {
		const { building, city, country, fullName, phoneNumber, pincode, road, state } = values;
		addAddress({
			building,
			city,
			country,
			fullName,
			phoneNumber,
			pincode,
			road,
			state,
			id: new Date().toISOString()
		});
		actions.resetForm({});
		setSnackbarVisible(true);
	};
	const handleCurrentLocationAddressSubmit = async (values: any, actions: any) => {
		setError(null);
		setLoading(true);
		const { fullName, phoneNumber } = values;
		const { error: locationError, location } = await getCurrentLocation();
		if (locationError) {
			setError(locationError);
			setLoading(false);
		}
		else {
			const { address, error: addressError } = await getAddressFromGeocode({
				latitude: location!.latitude,
				longitude: location!.longitude
			});
			setLoading(false);
			if (addressError) {
				setError(addressError);
			} else {
					addAddress({
			building:address?.street,
			city:address?.city,
			country:address?.country,
			fullName,
			phoneNumber,
			pincode:address?.postalCode,
			road:address?.subregion,
			state:address?.region,
			id: new Date().toISOString()
		});
		actions.resetForm({});
		setSnackbarVisible(true);	
			}
		}
	};
	return (
		<View style={{ flex: 1 }}>
			<Snackbar
				visible={!!error || snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={error?5000:3000}
			>
				{
					error ? error :
					'Added your address successfully'}
			</Snackbar>
			<View style={styles.radioContainer}>
				<RadioButton.Group onValueChange={(newValue: any) => setAddressType(newValue)} value={addressType}>
					<View style={styles.row}>
						<RadioButton value="mannual" />
						<Text>Add Address Mannualy</Text>
					</View>
					<View style={styles.row}>
						<RadioButton value="location" />
						<Text>Get Address From Current Location</Text>
					</View>
				</RadioButton.Group>
			</View>
			<ScrollView>
				{
					addressType === 'mannual' ? <AppForm
						initialValues={mannualAddressInitialValues}
						validationSchema={mannualAddressSchema}
						onSubmit={handleMannualAddressSubmit}
					>
						<AppFormField
							name="fullName"
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Full Name"
							textContentType="name"
							icon="rename-box"
						/>
						<AppFormField
							name="phoneNumber"
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Phone number"
							textContentType="telephoneNumber"
							keyboardType="numeric"
							icon="cellphone"
						/>
						<View style={styles.inputRow}>
							<AppFormField
								small
								style={styles.smallInput}
								name="pincode"
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Pincode"
								textContentType="postalCode"
								keyboardType="numeric"
								icon="numeric"
							/>
							<AppFormField
								small
								style={styles.smallInput}
								name="country"
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Country"
								textContentType="countryName"
								icon="home"
							/>
						</View>
						<View style={styles.inputRow}>
							<AppFormField
								small
								style={styles.smallInput}
								name="state"
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="State"
								textContentType="addressState"
								icon="home"
							/>
							<AppFormField
								small
								style={styles.smallInput}
								name="city"
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="City"
								textContentType="addressCity"
								icon="city"
							/>
						</View>
						<AppFormField
							name="building"
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="House No.,Building Name"
							textContentType="streetAddressLine1"
							icon="office-building"
						/>
						<AppFormField
							name="road"
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Road name,Area,Colony"
							textContentType="streetAddressLine2"
							icon="road-variant"
						/>
						<SubmitButton title={'save address'} />
					</AppForm> :
					<AppForm
						initialValues={cuurentLocationAddressInitialValues}
						validationSchema={currentLocationAddressSchema}
						onSubmit={handleCurrentLocationAddressSubmit}
					>
						<AppFormField
							name="fullName"
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Full Name"
							textContentType="name"
							icon="rename-box"
						/>
						<AppFormField
							name="phoneNumber"
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Phone number"
							textContentType="telephoneNumber"
							keyboardType="numeric"
							icon="cellphone"
						/>
						<SubmitButton loading={loading} title="add current location address" />
					</AppForm>}
			</ScrollView>
		</View>
	);
};

export default AddAddressScreen;

const styles = StyleSheet.create({
	inputRow:
		{
			flexDirection: 'row',
			justifyContent: 'space-around'
		},
	smallInput:
		{
			width: '45%'
		},
	row:
		{
			flexDirection: 'row',
			alignItems: 'center'
		},
	radioContainer:
		{
			padding: 10,
			marginVertical: 20
		}
});
