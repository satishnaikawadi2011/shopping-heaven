import create from 'zustand';
import { Product } from '../models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavouritesStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
	addToFavourites: (product: Product) => void;
	removeFromFavourites: (productId: string) => void;
	isFavourite: (productId: string) => boolean;
};

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
	products: [],
	setProducts: (products) => set((state) => ({ ...state, products })),
	addToFavourites:
		(product) => {
			get().setProducts([
				product,
				...get().products
			]);
			saveFavouritesDataToAsyncStorage(get().products);
		},
	removeFromFavourites:
		(productId) => {
			const favouriteProducts = get().products;
			const updatedFavouriteProducts = favouriteProducts.filter((product) => product._id !== productId);
			get().setProducts(updatedFavouriteProducts);
			saveFavouritesDataToAsyncStorage(get().products);
		},
	isFavourite:
		(productId) => {
			const favouriteProducts = get().products;
			const isInFavourites = favouriteProducts.find((product) => product._id === productId);
			if (isInFavourites) {
				return true;
			}
			return false;
		}
}));

const saveFavouritesDataToAsyncStorage = (products: Product[]) => {
	AsyncStorage.setItem('favouritesData', JSON.stringify({ favourites: products }));
};

export const getFavouritesDataFromAsyncStorage = async () => {
	const favouritesData: any = await AsyncStorage.getItem('favouritesData');
	if (favouritesData) {
		return JSON.parse(favouritesData);
	}
	return null;
};
