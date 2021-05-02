import { Order } from './../models/Order';
import create from 'zustand';

type OrderStore = {
	orders: Order[];
	setOrders: (orders: Order[]) => void;
};

export const useProductStore = create<OrderStore>((set, get) => ({
	orders: [],
	setOrders: (orders: Order[]) => set((state) => ({ ...state, orders }))
}));
