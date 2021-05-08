import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
	const [
		location,
		setLocation
	] = useState<{ longitude: number; latitude: number }>();
	const [
		isGranted,
		setIsGranted
	] = useState(false);
	const getLocation = async () => {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();
			if (!granted) {
				return { location, isGranted };
			}
			setIsGranted(true);
			const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
			setLocation({ longitude, latitude });
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getLocation();
	}, []);
	return { location, isGranted };
};

export default useLocation;
