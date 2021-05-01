import { Appbar } from 'react-native-paper';

function CustomNavigationBar() {
	// { navigation, previous }
	return (
		<Appbar.Header>
			{/* {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null} */}
			<Appbar.Content title="My awesome app" />
		</Appbar.Header>
	);
}
