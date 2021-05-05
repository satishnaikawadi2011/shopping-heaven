import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface ListItemProps {
	title: string;
	subTitle?: string;
	image?: ImageSourcePropType;
	ImageComponent?: any;
}

const AppListItem: React.FC<ListItemProps> = ({ image, title, subTitle, ImageComponent }) => {
	const theme = useTheme();
	return (
		<View style={styles.container}>
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
		</View>
	);
};

export default AppListItem;

const styles = StyleSheet.create({
	container:
		{
			flexDirection: 'row'
		},
	image:
		{
			width: 70,
			height: 70,
			borderRadius: 35
		},
	details:
		{
			marginLeft: 10
		},
	title:
		{
			fontWeight: '500'
		},
	subTitle: {}
});
