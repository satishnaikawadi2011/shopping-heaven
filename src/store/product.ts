import create from 'zustand';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

type ProductStore = {
	products: Product[];
	categories: Category[];
	setProducts: (products: Product[]) => void;
	setCategories: (categories: Category[]) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: [],
	categories: [],
	setProducts: (products: Product[]) => set((state) => ({ ...state, products })),
	setCategories: (categories: Category[]) => set((state) => ({ ...state, categories }))
}));
