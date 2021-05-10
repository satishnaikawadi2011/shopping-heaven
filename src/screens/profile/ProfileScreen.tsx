import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import AppDivider from '../../components/UI/app/AppDivider';
import AppIcon from '../../components/UI/app/AppIcon';
import AppListItem from '../../components/UI/app/AppListItem';
import { Colors as MdColors, Switch, Text } from 'react-native-paper';
import { useThemeStore } from '../../store/theme';
import { removeFromAsyncStorage, useAuthStore } from '../../store/auth';
import { getFocusedRouteNameFromRoute, RouteProp, useNavigation } from '@react-navigation/core';
import { StackNavigationOptions } from '@react-navigation/stack';

const navMenuItems = [
	{
		title: 'My Orders',
		icon:
			{
				name: 'bag-checked',
				backgroundColor: Colors.accent
		},
		targetScreen:'Orders'
	},
	{
		title: 'My Favourites',
		icon:
			{
				name: 'heart-circle-outline',
				backgroundColor: MdColors.pink500
		},
		targetScreen:'Favourites'
	},
		{
		title: 'Manage Addresses',
		icon:
			{
				name: 'map-marker-multiple',
				backgroundColor: MdColors.cyan400
		},
		targetScreen:'Addresses'
	}
];

const ProfileScreen = () => {
	const navigation = useNavigation()
	const { isDarkTheme, setIsDarkTheme } = useThemeStore();
	const {user,setUser,setToken,setExpiryDate} = useAuthStore()
	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<AppListItem
					title={user!.username}
					subTitle={user?.email}
					image={require('../../../assets/user.png')}
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
								onTrailingIconPress={() => navigation.navigate(item.targetScreen)}
								trailingIcon='chevron-right'
								ImageComponent={<AppIcon name={item.icon.name} bgColor={item.icon.backgroundColor}  
							/>}
							/>
						);
					}}
				/>
			</View>
			<View style={styles.container}>
				<AppListItem
					title="Logout"
					onPress={() => {
						setExpiryDate(null);
						setToken(null);
						setUser(null);
						removeFromAsyncStorage()
					}}
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
