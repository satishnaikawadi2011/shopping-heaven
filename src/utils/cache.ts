import AsyncStorage from '@react-native-async-storage/async-storage';
import getDiff from './diffBetweenDates';

const prefix = 'cache';
const expiryInMinutes = 5;

const store = async (key: string, value: any) => {
	try {
		const item = {
			value,
			timestamp: Date.now()
		};
		await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
	} catch (error) {
		console.log(error);
	}
};

const isExpired = (item: any) => {
	const now = new Date();
	const storedTime = new Date(item.timestamp);
	return getDiff(storedTime, now, 'minutes') > expiryInMinutes;
};

const get = async (key: string) => {
	try {
		const value: any = await AsyncStorage.getItem(prefix + key);
		const item = JSON.parse(value);
		if (!item) return null;

		if (isExpired(item)) {
			await AsyncStorage.removeItem(prefix + key);
			return null;
		}

		return item.value;
	} catch (error) {
		console.log(error);
	}
};

export default {
	store,
	get
};
