import create from 'zustand';
import { Product } from '../models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavouritesStore = {
	products: Product[];
	productIds: string[];
	setProductIds: (productIds: string[]) => void;
	setProducts: (products: Product[]) => void;
	addToFavourites: (product: Product) => void;
	removeFromFavourites: (productId: string) => void;
	isFavourite: (productId: string) => boolean;
};

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
	products: [],
	productIds: [],
	setProducts: (products) => set((state) => ({ ...state, products })),
	setProductIds: (productIds) => set((state) => ({ ...state, productIds })),
	addToFavourites:
		(product) => {
			get().setProducts([
				product,
				...get().products
			]);
			get().setProductIds([
				product._id,
				...get().productIds
			]);
			saveFavouritesDataToAsyncStorage(get().products, get().productIds);
		},
	removeFromFavourites:
		(productId) => {
			const favouriteProducts = get().products;
			const updatedFavouriteProducts = favouriteProducts.filter((product) => product._id !== productId);
			const updatedProductIds = get().productIds.filter((pId) => pId !== productId);
			get().setProducts(updatedFavouriteProducts);
			get().setProductIds(updatedProductIds);
			saveFavouritesDataToAsyncStorage(get().products, get().productIds);
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

const saveFavouritesDataToAsyncStorage = (products: Product[], productIds: string[]) => {
	AsyncStorage.setItem('favouritesData', JSON.stringify({ favourites: products, ids: productIds }));
};

export const getFavouritesDataFromAsyncStorage = async () => {
	const favouritesData: any = await AsyncStorage.getItem('favouritesData');
	if (favouritesData) {
		return JSON.parse(favouritesData);
	}
	return null;
};
