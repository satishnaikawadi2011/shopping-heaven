import create from 'zustand';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGY1ZmNmZTBjYTdjNTUyY2QxMzUyOSIsImlhdCI6MTYxOTk3NjI4NCwiZXhwIjoxNjIwNTgxMDg0fQ.KcXtOozrDZQqr6WsSMaRQcIoUVpUfpNk1G0QMPKNlTs`;

type ProductStore = {
	products: Product[];
	categories: Category[];
	loading: boolean;
	setLoading: (loading: boolean) => void;
	setProducts: (products: Product[]) => void;
	setCategories: (categories: Category[]) => void;
	fetchAndSetProducts: () => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: [],
	categories: [],
	loading: false,
	setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
	setProducts: (products: Product[]) => set((state) => ({ ...state, products })),
	setCategories: (categories: Category[]) => set((state) => ({ ...state, categories })),
	fetchAndSetProducts:
		async () => {
			try {
				get().setLoading(true);
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				const res = await axios.get(`${BACKEND_URL}/product`);
				get().setLoading(false);
				get().setProducts(res.data);
			} catch (error) {
				console.log(error.response.data);
				get().setLoading(false);
			}
		}
}));
