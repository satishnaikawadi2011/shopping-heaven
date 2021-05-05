import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { useTheme as useNavTheme } from '@react-navigation/native';

interface ListItemProps {
	title: string;
	subTitle?: string;
	image?: ImageSourcePropType;
	ImageComponent?: any;
}

const AppListItem: React.FC<ListItemProps> = ({ image, title, subTitle, ImageComponent }) => {
	const theme = useTheme();
	const navTheme = useNavTheme();
	return (
		<Surface
			style={[
				styles.container,
				{ backgroundColor: navTheme.colors.card }
			]}
		>
			{ImageComponent}
			{image && <Image source={image} style={styles.image} />}
			<View style={styles.details}>
				<Text
					style={[
						styles.title
					]}
				>
					{title}
				</Text>
				{subTitle && (
					<Text
						style={[
							styles.subTitle,
							{ color: theme.colors.placeholder }
						]}
					>
						{subTitle}
					</Text>
				)}
			</View>
		</Surface>
	);
};

export default AppListItem;

const styles = StyleSheet.create({
	container:
		{
			flexDirection: 'row',
			marginHorizontal: 10,
			padding: 8
		},
	image:
		{
			width: 70,
			height: 70,
			borderRadius: 35
		},
	details:
		{
			marginLeft: 10,
			justifyContent: 'center'
		},
	title:
		{
			fontWeight: 'bold',
			fontFamily: 'UbuntuBold',
			fontSize: 17
		},
	subTitle:
		{
			fontSize: 15
		}
});
