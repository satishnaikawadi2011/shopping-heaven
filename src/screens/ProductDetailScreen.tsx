import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Paragraph, Subheading, Title, useTheme } from 'react-native-paper';
import { Colors } from '../../constants/colors';
import AppButton from '../components/UI/Button';
// import { Colors } from '../../constants/colors';

const ProductDetailScreen = () => {
	const theme = useTheme();
	return (
		<View style={{ flex: 1 }}>
			<Image
				style={styles.image}
				source={{ uri: 'https://cdn.pixabay.com/photo/2014/12/03/06/31/showroom-555113__340.jpg' }}
			/>
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<Subheading style={styles.subHeading}>Polo Materials</Subheading>
					<Title style={styles.title}>$ 200</Title>
				</View>
				<Divider style={{ height: 0.2, backgroundColor: theme.colors.placeholder }} />
				<View style={{ flex: 1 }}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{}}>
						<View style={styles.subContainer}>
							<Title>Details</Title>
							<Paragraph>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore rem nulla est beatae.
								Esse, animi deserunt! Quos, et veritatis.
							</Paragraph>
						</View>
						<View style={styles.subContainer}>
							<Title>Category</Title>
							<Subheading>Clothing</Subheading>
						</View>
						<View style={styles.buttonsContainer}>
							<AppButton bgColor={Colors.accent} title={'add to cart'} />
							<AppButton title={'buy now'} />
						</View>
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
	image:
		{
			width: '100%',
			height: 350
		},
	container:
		{
			padding: 20,
			flex: 1
		},
	subHeading:
		{
			fontSize: 20
		},
	title:
		{
			fontSize: 22,
			fontWeight: 'bold'
		},
	subContainer:
		{
			marginVertical: 8
		},
	buttonsContainer:
		{
			width: '100%'
		}
});
