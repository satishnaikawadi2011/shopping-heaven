import create from 'zustand';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

type ProductStore = {
	products: Product[];
	categories: Category[];
	loading: boolean;
	selectedCategory: Category | null;
	setSelectedCategory: (category: Category | null) => void;
	setLoading: (loading: boolean) => void;
	setProducts: (products: Product[]) => void;
	setCategories: (categories: Category[]) => void;
	fetchAndSetProductsAndCategories: () => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: [],
	categories: [],
	loading: false,
	selectedCategory: null,
	setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
	setProducts: (products: Product[]) => set((state) => ({ ...state, products })),
	setCategories: (categories: Category[]) => set((state) => ({ ...state, categories })),
	setSelectedCategory: (category: Category | null) => set((state) => ({ ...state, selectedCategory: category })),
	fetchAndSetProductsAndCategories:
		async () => {
			try {
				get().setLoading(true);
				const productResponse = await axios.get(`${BACKEND_URL}/product`);
				const categoryResponse = await axios.get(`${BACKEND_URL}/category`);
				get().setLoading(false);
				get().setProducts(productResponse.data);
				get().setCategories(categoryResponse.data);
			} catch (error) {
				console.log(error.response.data);
				get().setLoading(false);
			}
		}
}));
