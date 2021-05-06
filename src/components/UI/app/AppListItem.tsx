import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, TouchableWithoutFeedback } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { useTheme as useNavTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ListItemProps {
	title: string;
	subTitle?: string;
	image?: ImageSourcePropType;
	ImageComponent?: any;
	trailingIcon?: any;
	onPress?: () => void;
}

const AppListItem: React.FC<ListItemProps> = ({ trailingIcon, image, title, subTitle, ImageComponent, onPress }) => {
	const theme = useTheme();
	const navTheme = useNavTheme();
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Surface
				style={[
					styles.container,
					{ backgroundColor: navTheme.colors.card }
				]}
			>
				<View style={{ flexDirection: 'row' }}>
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
				{trailingIcon && <MaterialCommunityIcons color={theme.colors.text} name={trailingIcon} />}
			</Surface>
		</TouchableWithoutFeedback>
	);
};

export default AppListItem;

const styles = StyleSheet.create({
	container:
		{
			flexDirection: 'row',
			marginHorizontal: 10,
			justifyContent: 'space-between',
			alignItems: 'center',
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
