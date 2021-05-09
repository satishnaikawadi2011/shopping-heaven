import * as Location from 'expo-location';

interface GeoCode {
	longitude: number;
	latitude: number;
}

export const getCurrentLocation = async (): Promise<{ location: GeoCode | null; error: string | null }> => {
	let error: null | string = null;
	let location: GeoCode | null = null;
	try {
		const { granted } = await Location.requestForegroundPermissionsAsync();
		if (!granted) {
			error = 'Please allow permission to use Location.';
			return { location, error };
		}
		const { coords } = await Location.getCurrentPositionAsync();
		location = { latitude: coords.latitude, longitude: coords.longitude };
		return { location, error };
	} catch (err) {
		console.log(err);
		error = 'Something went wrong !!';
		return { location, error };
	}
};

export const getAddressFromGeocode = async (
	location: GeoCode
): Promise<{ address: Location.LocationGeocodedAddress | null; error: string | null }> => {
	let error: null | string = null;
	let address: Location.LocationGeocodedAddress | null = null;
	try {
		const { granted } = await Location.requestForegroundPermissionsAsync();
		if (!granted) {
			error = 'Please allow permission to use Location.';
			return { address, error };
		}

		const addressArr = await Location.reverseGeocodeAsync({
			latitude: location.latitude,
			longitude: location.longitude
		});
		address = addressArr[0];
		return { address, error };
	} catch (err) {
		console.log(err);
		error = 'Something went wrong !!';
		return { address, error };
	}
};
