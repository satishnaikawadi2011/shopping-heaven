import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Address } from '../models/Address';

type AddressStore = {
	addresses: Address[];
	preferredAddress: Address | null;
	setPreferredAddress: (address: Address) => void;
	setAddresses: (addresses: Address[]) => void;
	addAddress: (address: Address) => void;
	removeAddress: (addressId: string) => void;
	getAddress: (addressId: string) => Address | undefined;
};

export const useAddressStore = create<AddressStore>((set, get) => ({
	addresses: [],
	preferredAddress: null,
	setPreferredAddress: (address) => set((state) => ({ ...state, preferredAddress: address })),
	setAddresses: (addresses) => set((state) => ({ ...state, addresses })),
	addAddress:
		(address) => {
			get().setAddresses([
				address,
				...get().addresses
			]);
			get().setPreferredAddress(address);
			saveAddressDataToAsyncStorage(get().addresses);
		},
	removeAddress:
		(addressId) => {
			const addresses = get().addresses;
			const updatedAddresses = addresses.filter((address) => address.id !== addressId);
			get().setAddresses(updatedAddresses);
			get().setPreferredAddress(get().addresses[0]);
			saveAddressDataToAsyncStorage(get().addresses);
		},
	getAddress:
		(addressId) => {
			const address = get().addresses.find((address) => address.id === addressId);
			return address;
		}
}));

const saveAddressDataToAsyncStorage = (addresses: Address[]) => {
	AsyncStorage.setItem('addressData', JSON.stringify({ addresses }));
};

export const getAddressDataFromAsyncStorage = async () => {
	const { setPreferredAddress } = useAddressStore();
	const addressData: any = await AsyncStorage.getItem('addressData');
	if (addressData) {
		setPreferredAddress(addressData.addresses[0]);
		return JSON.parse(addressData);
	}
	return null;
};
