import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { Colors } from '../../../constants/colors';
import { Category } from '../../models/Category';
import { useProductStore } from '../../store/product';

interface CategoryListProps {
	categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    const {setSelectedCategory,selectedCategory} = useProductStore()
	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				keyExtractor={(item) => item._id}
				data={categories}
				renderItem={({ item }) => {
					return (
						<Chip onPress={selectedCategory?.name === item.name ? () => setSelectedCategory(null) :() => setSelectedCategory(item)} mode="outlined" selected={selectedCategory?.name === item.name} style={{ ...styles.chip, backgroundColor: selectedCategory?.name === item.name ? Colors.primary:Colors.accent }}>
							<Text style={{color:'#000000'}}>
								{item.name}
							</Text>
						</Chip>
					);
				}}
			/>
		</View>
	);
};

export default CategoryList;

const styles = StyleSheet.create({
	container:
		{
			margin: 10
		},
	chip:
		{
		marginHorizontal: 10,
		}
});
