import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import { Colors } from '../../../constants/colors';

const OfflineNotice = () => {
	const netInfo = useNetInfo();
	// console.log(netInfo);
	if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>No Internet Connection.</Text>
			</View>
		);
	}
	return null;
};

export default OfflineNotice;

const styles = StyleSheet.create({
	container:
		{
			backgroundColor: Colors.primary,
			width: '100%',
			height: 50,
			position: 'absolute',
			zIndex: 1,
			top: Constants.statusBarHeight,
			alignItems: 'center',
			justifyContent: 'center'
		},
	text:
		{
			fontSize: 17
		}
});
