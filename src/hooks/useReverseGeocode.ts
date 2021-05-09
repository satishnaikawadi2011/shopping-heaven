import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface LocationType {
	latitude: number;
	longitude: number;
}

const useReverseGeocode = (location: LocationType) => {
	const [
		address,
		setAddress
	] = useState<Location.LocationGeocodedAddress | null>();
	const [
		loading,
		setLoading
	] = useState(false);
	useEffect(
		() => {
			const getAddress = async (lat: any, long: any) => {
				setLoading(true);
				try {
					const address = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
					setAddress(address[0]);
					setLoading(false);
				} catch (error) {
					console.log(error);
					setLoading(false);
				}
			};
			if (location) {
				getAddress(location.latitude, location.longitude);
			}
		},
		[
			location
		]
	);
	return { address, loading };
};

export default useReverseGeocode;
