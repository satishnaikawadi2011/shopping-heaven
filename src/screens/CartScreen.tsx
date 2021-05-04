import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Screen from '../components/Screen';
import DoubleBlockButton from '../components/UI/DoubleBlockButton';

const CartScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corrupti nemo optio! Saepe et
						vel illum accusantium iusto ratione dolorem sunt, dolore accusamus cum fuga provident sapiente
						id minima alias nisi nulla dolor, rem error ipsum. Dolorem facere illo laboriosam molestiae
						provident earum corporis, recusandae, voluptates qui, minus harum distinctio.
					</Text>
				</ScrollView>
			</View>
			<DoubleBlockButton
				leftButtonProps={{ label: 'add to cart', icon: 'cart-plus' }}
				rightButtonProps={{ label: 'buy now', onPress: () => {} }}
			/>
			{/* <DoubleBlockButton /> */}
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({});
