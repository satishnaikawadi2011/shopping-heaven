import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppForm from '../components/UI/form/AppForm';
import * as Yup from 'yup';
import AppFormField from '../components/UI/form/AppFormField';
import SubmitButton from '../components/UI/form/SubmitButton';
import { useAddressStore } from '../store/address';

const initialValues = {
	fullName: '',
	phoneNumber: '',
	pincode: '',
	state: '',
	country: '',
	city: '',
	road: '',
	building: ''
};

const addressSchema = Yup.object({
	fullName: Yup.string().required(),
	phoneNumber: Yup.string().required().length(10),
	pincode: Yup.string().required().length(6),
	state: Yup.string().required(),
	country: Yup.string().required(),
	city: Yup.string().required(),
	road: Yup.string().required('This field is required.'),
	building: Yup.string().required('This field is required.')
});

const AddAddressScreen = () => {
	const { addAddress } = useAddressStore();
	const handleSubmit = (values: any, actions: any) => {
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
	};
	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<AppForm initialValues={initialValues} validationSchema={addressSchema} onSubmit={handleSubmit}>
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
				</AppForm>
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
		}
});
