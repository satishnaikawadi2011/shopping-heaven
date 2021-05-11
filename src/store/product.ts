import create from 'zustand';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

type ProductStore = {
	products: Product[];
	categories: Category[];
	loading: boolean;
	selectedCategory: Category | null;
	setSelectedCategory: (category: Category | null) => void;
	setLoading: (loading: boolean) => void;
	setProducts: (products: Product[]) => void;
	setCategories: (categories: Category[]) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: [],
	categories: [],
	loading: false,
	selectedCategory: null,
	setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
	setProducts: (products: Product[]) => set((state) => ({ ...state, products })),
	setCategories: (categories: Category[]) => set((state) => ({ ...state, categories })),
	setSelectedCategory: (category: Category | null) => set((state) => ({ ...state, selectedCategory: category }))
}));
