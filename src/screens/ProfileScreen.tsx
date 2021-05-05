import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';
import AppDivider from '../components/UI/AppDivider';
import AppIcon from '../components/UI/AppIcon';
import AppListItem from '../components/UI/AppListItem';
import { Colors as MdColors, Switch, Text } from 'react-native-paper';
import { useThemeStore } from '../store/theme';

const navMenuItems = [
	{
		title: 'My Orders',
		icon:
			{
				name: 'bag-checked',
				backgroundColor: Colors.accent
			}
	},
	{
		title: 'My Favourites',
		icon:
			{
				name: 'heart-circle-outline',
				backgroundColor: MdColors.pink500
			}
	}
];

const ProfileScreen = () => {
	const { isDarkTheme, setIsDarkTheme } = useThemeStore();
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<AppListItem
					title="Satish Naikawadi"
					subTitle="saty@gmail.com"
					image={require('../../assets/user.png')}
				/>
			</View>
			<View style={styles.container}>
				<FlatList
					data={navMenuItems}
					keyExtractor={(item) => item.title}
					ItemSeparatorComponent={AppDivider}
					renderItem={({ item }) => {
						return (
							<AppListItem
								title={item.title}
								ImageComponent={<AppIcon name={item.icon.name} bgColor={item.icon.backgroundColor} />}
							/>
						);
					}}
				/>
			</View>
			<View style={styles.container}>
				<AppListItem
					title="Logout"
					ImageComponent={<AppIcon name="logout-variant" bgColor={MdColors.red500} />}
				/>
				<AppDivider />
				<View style={styles.themeToggleContainer}>
					<View style={styles.details}>
						<AppIcon name="theme-light-dark" bgColor={MdColors.teal600} />
						<Text style={styles.title}>Dark Theme</Text>
					</View>
					<Switch
						color={Colors.primary}
						value={isDarkTheme}
						onValueChange={() => setIsDarkTheme(!isDarkTheme)}
					/>
				</View>
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container:
		{
			marginVertical: 20
		},
	themeToggleContainer:
		{
			marginHorizontal: 20,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
	details:
		{
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		},
	title:
		{
			fontFamily: 'UbuntuBold',
			fontWeight: 'bold',
			fontSize: 17,
			marginLeft: 10
		}
});