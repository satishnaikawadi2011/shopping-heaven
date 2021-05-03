import { Order } from './../models/Order';
import create from 'zustand';

type OrderStore = {
	orders: Order[];
	loading: boolean;
	setLoading: (loading: boolean) => void;
	setOrders: (orders: Order[]) => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
	orders: [],
	loading: false,
	setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
	setOrders: (orders: Order[]) => set((state) => ({ ...state, orders }))
}));
